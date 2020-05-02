/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
/* eslint-disable camelcase */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import UserContext from '../../contexts/UserContext';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import UnderlinedLinkText from '../../reusables/components/Texts/UnderlinedLinkText';
import { BagError, BagSuccess } from '../../reusables/styles/colors';
import { marginStyles } from '../../reusables/styles/style';
import { sendAlert } from '../Common/Utils/alert';
import { axiosPost } from '../Common/Utils/axiosConfig';
import { useFetch } from '../Common/Utils/useFetch';
import ChunkSelectionModal from './ChunkSelectionModal';
import ChunksList from './ChunksList';
import Nav from './Nav';
import { getSelectedCorpus } from './Utils/corpusProcessing';
import { getNextOperation, getOperationName, operationToWord } from './Utils/general';
import { getInitialWord, getWordData } from './Utils/getInitialWord';

axios.defaults.withCredentials = true;

const ChunkScreen = () => {
  const { user } = useContext(UserContext);

  const [page, setPage] = useState(1);

  const corpora = useFetch('get_corpora/', { page }, (_data) => JSON.parse(_data.corpora));

  const userCorpora = useFetch('get_user_corpora/', { page: 1 }, (_data) => JSON.parse(_data.corpora));


  const [data, setData] = useState(null);
  const initialChunk = {
    index: null,
    chunk: null,
    updated: false,
  };
  const [currentChunk, setCurrentChunk] = useState(initialChunk);
  const [modalVisible, setModalVisible] = useState(false);
  const [corporaToggle, setCorporaToggle] = useState(false);
  const [addEntry, setAddEntry] = useState(false);

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
      setAddEntry(true);
    } else {
      setAddEntry(false);
    }
    if (currentChunk.index !== null) {
      setCurrentChunk((prevData) => ({
        ...prevData,
        index: currentChunk.index,
        chunk: getSelectedCorpus(
          { fontSize: 24, marginRight: 6 },
          data[currentChunk.index].fields,
          addEntry ? () => {} : handleWordPress,
          wordData,
          corporaToggle,
        ),
      }));
    }
  }, [wordData, operation, addEntry]);

  useEffect(() => {
    if (currentChunk.index !== null) {
      if (corporaToggle) {
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

  useEffect(() => {
    if (corpora.data) { setData(corpora.data); }
  }, [corpora.data]);

  useEffect(() => {
    if (corporaToggle) { setData(userCorpora.data); } else { setData(corpora.data); }
    setCurrentChunk(initialChunk);
  }, [corporaToggle]);

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
    const [startA, endA] = wordData.A.offset.split(',').map((item) => parseInt(item));
    const [startB, endB] = wordData.B.offset.split(',').map((item) => parseInt(item));

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
      corpus: corporaToggle
        ? data[currentChunk.index].fields.corpus[2]
        : data[currentChunk.index].pk,
      user: user.id,
    };

    setCurrentChunk(initialChunk);

    const postResponse = await axiosPost('add_entry_user/', _data);
    sendAlert(postResponse.data.text, '', () => setModalVisible(false));
  };

  // useRenderCount();

  return (
    <FlexedContainer>
      {!corpora.loading ? (
        <>
          <Nav setCorporaToggle={setCorporaToggle} />
          <ChunksList
            data={data}
            setIndex={setCurrentChunk}
            modelToggle={setModalVisible}
            corporaToggle={corporaToggle}
          />
          {currentChunk.index !== null ? (
            <ChunkSelectionModal
              visible={modalVisible}
              data={wordData}
              chunk={currentChunk}
              setData={setWordData}
              closeModal={() => setModalVisible(false)}
              addEntry={addEntry}
              handleAddEntry={dataToServer}
              operationName={getOperationName(operation)}
              setCurrentChunk={setCurrentChunk}
              completed={corporaToggle}
            />
          ) : null}
          <UnderlinedLinkText text="Load More Chunks" handlePress={() => setPage((prevPage) => prevPage + 1)} />
        </>
      ) : (
        <ActivityIndicator size="small" style={marginStyles.mt_24} />
      )}
    </FlexedContainer>
  );
};

export default ChunkScreen;
