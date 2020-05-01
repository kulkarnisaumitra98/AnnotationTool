/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
/* eslint-disable camelcase */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import UserContext from '../../contexts/UserContext';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
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
import { getInitialWord } from './Utils/getInitialWord';

axios.defaults.withCredentials = true;

const ChunkScreen = () => {
  const corpora = useFetch(
    'get_corpora/',
    { page: 1 },
    (_data) => JSON.parse(_data.corpora),
  );

  const userCorpora = useFetch(
    'get_user_corpora/',
    { page: 1 },
    (_data) => JSON.parse(_data.corpora),
  );


  const { user } = useContext(UserContext);

  // const [page, setPage] = useState(1);

  const [data, setData] = useState(null);
  const [currentChunk, setCurrentChunk] = useState({
    index: null,
    chunk: null,
  });
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
      setCurrentChunk({
        index: currentChunk.index,
        chunk: getSelectedCorpus(
          { fontSize: 24, marginRight: 6 },
          data[currentChunk.index].fields,
          addEntry ? () => {} : handleWordPress,
          wordData,
        ),
      });
    }
  }, [wordData, operation, addEntry]);

  useEffect(() => {
    if (currentChunk.index !== null) {
      setCurrentChunk({
        index: currentChunk.index,
        chunk: getSelectedCorpus(
          { fontSize: 24, marginRight: 6 },
          data[currentChunk.index].fields,
          handleWordPress,
        ),
      });
    }
  }, [currentChunk.index]);

  useEffect(() => {
    if (corpora.data) { setData(corpora.data); }
  }, [corpora.data]);

  useEffect(() => {
    if (corporaToggle) { setData(userCorpora.data); } else { setData(corpora.data); }
  }, [corporaToggle]);

  useEffect(() => {
    console.log(userCorpora.data);
  }, [userCorpora.data]);

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
      corpus: data[currentChunk.index].pk,
      user: user.id,
    };

    const postResponse = await axiosPost('add_entry_user/', _data);
    sendAlert(postResponse.data.text, '', () => setModalVisible(false));
  };

  // useRenderCount();

  return (
    <FlexedContainer>
      {!corpora.loading ? (
        <>
          <Nav completedChunks={() => setCorporaToggle(true)} />
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
              chunk={currentChunk.chunk}
              setData={setWordData}
              closeModal={() => setModalVisible(false)}
              addEntry={addEntry}
              handleAddEntry={dataToServer}
              operationName={getOperationName(operation)}
            />
          ) : null}
        </>
      ) : (
        <ActivityIndicator size="small" style={marginStyles.mt_24} />
      )}
    </FlexedContainer>
  );
};

export default ChunkScreen;
