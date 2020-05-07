/* eslint-disable radix */
/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import { BagError, BagSuccess } from '../../../reusables/styles/colors';
import useDidUpdate from '../useDidUpdate';
import usePrevious from '../usePrevious';
import { sendAlert } from '../Utils/alert';
import { axiosPost } from '../Utils/axiosConfig';
import { useFetch } from '../Utils/useFetch';
import { getSelectedCorpus, highlighSelected, removeSelected } from './Utils/corpusProcessing';
import { getNextOperation, getOperationBgColor, operationToWord } from './Utils/general';
import { getInitialWord, getWordData } from './Utils/getInitialWord';

const useChunk = (completed, navigation, textStyle) => {
  const [page, setPage] = useState(1);
  const { user } = useContext(UserContext);
  const [reload, setReload] = useState(true);
  const [currOpData, setCurrOpData] = useState(null);

  const { _data, loading, err } = useFetch(
    !completed ? 'get_corpora/' : 'get_user_corpora/',
    { page, user: user?.id },
    (dat) => dat,
    reload,
  );

  const data = _data ? JSON.parse(_data.corpora) : null;
  const end = _data?.end;

  const initialChunk = {
    index: null,
    chunk: null,
    updated: false,
  };
  const [currentChunk, setCurrentChunk] = useState(initialChunk);
  const [modalVisible, setModalVisible] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const initialState = {
    A: getInitialWord(BagSuccess),
    B: getInitialWord(BagError),
    gender: 0,
  };

  const [wordData, setWordData] = useState(initialState);
  const [operation, setOperation] = useState(0);
  const [isRemovalOp, setIsRemovalOp] = useState({ value: false, op: null });

  const prevWordData = usePrevious(wordData);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user) { setReload((prevReload) => !prevReload); }
    });

    return unsubscribe;
  }, [navigation]);


  useDidUpdate(() => {
    if (operation === 2) { return; }
    setWordData((prevData) => ({
      ...prevData,
      [operationToWord(operation)]: {
        ...currOpData,
        color: getOperationBgColor(operation),
      },
    }));
  }, [currOpData]);

  useEffect(() => {
    if (isRemovalOp.value) {
      setWordData((prevData) => ({
        ...prevData,
        [operationToWord(isRemovalOp.op)]: getInitialWord(
          getOperationBgColor(isRemovalOp.op),
        ),
      }));
    }
  }, [isRemovalOp.value]);

  useDidUpdate(() => {
    if (completed) {
      setCurrentChunk((prevData) => ({
        ...prevData,
        index: currentChunk.index,
        chunk: getSelectedCorpus(
          textStyle,
          data[currentChunk.index].fields,
          handleWordPress,
          wordData,
          true,
        ),
      }));
      return;
    }
    if (prevWordData) {
      if (prevWordData.gender !== wordData.gender) {
        setOperation(getNextOperation(wordData));
        return;
      }
    }
    if (isRemovalOp.value) {
      // console.log(prevWordData, 'prev');
      setCurrentChunk((prevData) => ({
        ...prevData,
        index: prevData.index,
        chunk: removeSelected(
          prevWordData,
          isRemovalOp.op,
          prevData.chunk,
          handleWordPress,
          textStyle,
        ),
      }));
    } else if (currentChunk.index !== null) {
      setCurrentChunk(() => ({
        index: currentChunk.index,
        chunk: highlighSelected(
          wordData[operationToWord(operation)],
          currentChunk.chunk,
          textStyle,
        ),
      }));
    }
  }, [wordData]);

  useDidUpdate(() => {
    if (isRemovalOp.value) {
      setIsRemovalOp({ value: false, op: null });
    }
    setOperation(getNextOperation(wordData));
  }, [currentChunk.chunk]);

  useDidUpdate(() => {
    if (operation === 3) {
      setAllDone(true);
    } else {
      setAllDone(false);
    }
  }, [operation]);

  const handleWordPress = (value, offset, index) => () => {
    setCurrOpData({ value, offset, index });
  };

  useEffect(() => {
    if (currentChunk.index !== null) {
      if (completed) {
        const {
          correct_noun,
          correct_noun_off_start,
          correct_noun_index,
          mislead_noun,
          mislead_noun_off_start,
          mislead_noun_index,
          gender,
        } = data[currentChunk.index].fields;
        setWordData({
          A: getWordData(
            correct_noun,
            `${correct_noun_off_start}, ${
              correct_noun_off_start + correct_noun.length - 1
            }`,
            correct_noun_index,
            BagSuccess,
          ),
          B: getWordData(
            mislead_noun,
            `${mislead_noun_off_start}, ${
              mislead_noun_off_start + mislead_noun.length - 1
            }`,
            mislead_noun_index,
            BagError,
          ),
          gender: gender + 1,
        });
      } else {
        setWordData(initialState);

        setCurrentChunk((prevData) => ({
          ...prevData,
          index: currentChunk.index,
          chunk: getSelectedCorpus(
            textStyle,
            data[currentChunk.index].fields,
            handleWordPress,
          ),
        }));
      }
    }
  }, [currentChunk.index]);

  const dataToServer = async () => {
    const [startA, endA] = wordData.A.offset
      .split(',')
      .map((item) => parseInt(item));
    const [startB, endB] = wordData.B.offset
      .split(',')
      .map((item) => parseInt(item));

    const data_ = {
      correct_noun: wordData.A.value,
      correct_noun_off_start: startA,
      correct_noun_off_end: endA,
      correct_noun_index: wordData.A.index,
      mislead_noun: wordData.B.value,
      mislead_noun_off_start: startB,
      mislead_noun_off_end: endB,
      mislead_noun_index: wordData.B.index,
      gender: parseInt(wordData.gender) - 1,
      corpus: completed
        ? data[currentChunk.index].fields.corpus[2]
        : data[currentChunk.index].pk,
      user: user.id,
    };

    setCurrentChunk(initialChunk);

    const postResponse = await axiosPost('add_entry_user/', data_);
    setReload((prevReload) => !prevReload);
    sendAlert(postResponse.data.text, '', () => setModalVisible(false));
  };


  return {
    data,
    end,
    err,
    loading,
    page,
    setPage,
    currentChunk,
    setCurrentChunk,
    modalVisible,
    setModalVisible,
    allDone,
    setAllDone,
    wordData,
    setWordData,
    operation,
    setOperation,
    dataToServer,
    setReload,
    setIsRemovalOp,
  };
};

export default useChunk;
