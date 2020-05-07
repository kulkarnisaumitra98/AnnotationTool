/* eslint-disable radix */
/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import { BagError, BagSuccess } from '../../../reusables/styles/colors';
import useDidUpdate from '../useDidUpdate';
import { sendAlert } from '../Utils/alert';
import { axiosPost } from '../Utils/axiosConfig';
import { useFetch } from '../Utils/useFetch';
import { processCorpusWords } from './Utils/corpusProcessing';
import { getNextOperation, getOperationBgColor, operationToWord } from './Utils/general';
import { getInitialWord, getWordData } from './Utils/getInitialWord';

const useChunk = (completed, navigation) => {
  const [page, setPage] = useState(1);
  const { user } = useContext(UserContext);
  const [reload, setReload] = useState(true);

  const { _data, loading, err } = useFetch(
    !completed ? 'get_corpora/' : 'get_user_corpora/',
    { page, user: user?.id },
    (dat) => dat,
    reload,
  );

  const data = _data ? JSON.parse(_data.corpora) : null;
  const end = _data?.end;

  const [currentIndex, setCurrentIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [processedWords, setProcessedWords] = useState(null);

  const initialState = {
    A: getInitialWord(BagSuccess),
    B: getInitialWord(BagError),
    gender: 0,
  };

  const [wordData, setWordData] = useState(initialState);
  const [operation, setOperation] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user) {
        setReload((prevReload) => !prevReload);
      }
    });

    return unsubscribe;
  }, [navigation]);

  useDidUpdate(() => {
    if (currentIndex !== null) {
      setOperation(getNextOperation(wordData));
    }
  }, [wordData]);

  useDidUpdate(() => {
    if (operation === 3) {
      setAllDone(true);
    } else {
      setAllDone(false);
    }
  }, [operation]);

  useDidUpdate(() => {
    if (currentIndex !== null) {
      if (completed) {
        const {
          correct_noun,
          correct_noun_off_start,
          correct_noun_index,
          mislead_noun,
          mislead_noun_off_start,
          mislead_noun_index,
          gender,
        } = data[currentIndex].fields;
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
        setProcessedWords(
          processCorpusWords(
            data[currentIndex].fields,
            [{ op: 0, index: correct_noun_index }, { op: 1, index: mislead_noun_index }],
            completed,
          ),
        );
      } else {
        setWordData(initialState);
        setProcessedWords(processCorpusWords(data[currentIndex].fields));
      }
    } else {
      setCurrentIndex(null);
      setUpdated(null);
      setProcessedWords(null);
    }
  }, [currentIndex]);

  const handlePressWord = (word, offset, index, remove, op) => {
    if (operation === 2 && !remove) return;

    const updatedProcessCorpusWords = [...processedWords];
    updatedProcessCorpusWords[index] = {
      word,
      offset,
      index,
      color: remove ? null : getOperationBgColor(operation),
    };
    setProcessedWords(updatedProcessCorpusWords);
    if (remove) {
      setWordData((prevData) => ({
        ...prevData,
        [operationToWord(op)]: getInitialWord(getOperationBgColor(op)),
      }));
    } else {
      setWordData((prevData) => ({
        ...prevData,
        [operationToWord(operation)]: getWordData(
          word,
          `${offset}, ${offset + word.length}`,
          index,
          getOperationBgColor(operation),
        ),
      }));
    }
  };

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
        ? data[currentIndex].fields.corpus[2]
        : data[currentIndex].pk,
      user: user.id,
    };

    setCurrentIndex(null);
    setUpdated(null);
    setProcessedWords(null);

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
    currentIndex,
    setCurrentIndex,
    modalVisible,
    setModalVisible,
    allDone,
    setAllDone,
    wordData,
    setWordData,
    operation,
    setOperation,
    dataToServer,
    processedWords,
    handlePressWord,
    updated,
    setUpdated,
  };
};

export default useChunk;
