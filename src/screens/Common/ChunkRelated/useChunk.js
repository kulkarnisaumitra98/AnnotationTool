/* eslint-disable radix */
/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../contexts/UserContext';
import { BagError, BagSuccess } from '../../../reusables/styles/colors';
import { sendAlert } from '../Utils/alert';
import { axiosPost } from '../Utils/axiosConfig';
import { useFetch } from '../Utils/useFetch';
import { getSelectedCorpus } from './Utils/corpusProcessing';
import { getNextOperation, operationToWord } from './Utils/general';
import { getInitialWord, getWordData } from './Utils/getInitialWord';

const useChunk = (completed) => {
  const [page, setPage] = useState(1);
  const { user } = useContext(UserContext);

  const { data, loading } = useFetch(
    !completed ? 'get_corpora/' : 'get_user_corpora/',
    { page },
    (_data) => JSON.parse(_data.corpora),
  );

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


  useEffect(() => {
    const operationNumber = getNextOperation(wordData);
    setOperation(operationNumber);
  }, [wordData]);

  useEffect(() => {
    if (operation === 3) {
      setAllDone(true);
    } else {
      setAllDone(false);
    }
    if (currentChunk.index !== null) {
      setCurrentChunk((prevData) => ({
        ...prevData,
        index: currentChunk.index,
        chunk: getSelectedCorpus(
          { fontSize: 24, marginRight: 6 },
          data[currentChunk.index].fields,
          allDone ? () => {} : handleWordPress,
          wordData,
          completed,
        ),
      }));
    }
  }, [wordData, operation, allDone]);

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
            { fontSize: 24, marginRight: 6 },
            data[currentChunk.index].fields,
            handleWordPress,
          ),
        }));
      }
    }
  }, [currentChunk.index]);


  const handleWordPress = (value, offset, index) => () => {
    if (operation === 2) return;

    setWordData((prevData) => ({
      ...prevData,
      [operationToWord(operation)]: {
        ...prevData[operationToWord(operation)],
        value,
        offset,
        index,
      },
    }));
  };

  const dataToServer = async () => {
    const [startA, endA] = wordData.A.offset
      .split(',')
      .map((item) => parseInt(item));
    const [startB, endB] = wordData.B.offset
      .split(',')
      .map((item) => parseInt(item));

    const _data = {
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

    const postResponse = await axiosPost('add_entry_user/', _data);
    sendAlert(postResponse.data.text, '', () => setModalVisible(false));
  };


  return {
    data,
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
  };
};

export default useChunk;
