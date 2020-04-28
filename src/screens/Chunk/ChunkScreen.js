/* eslint-disable radix */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { BagError, BagSuccess } from '../../reusables/styles/colors';
import { marginStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';
import notNull from '../Common/Utils/general';
import ChunkSelectionModal from './ChunkSelectionModal';
import ChunksList from './ChunksList';
import { useFetch } from './useFetch';
import { getSelectedCorpus } from './Utils/corpusProcessing';
import getInitialWord from './Utils/getInitialWord';

const TASKS = 2;

const operationToWord = (operation) => {
  switch (operation) {
    case 0:
      return 'A';
    case 1:
      return 'B';
    default:
      return 'C';
  }
};

const getNextOperation = (data) => {
  let index = 0;
  const taskArr = Object.keys(data);
  for (let i = 0; i < taskArr.length; i += 1) {
    if (data[taskArr[i]].value !== 'None') index += 1;
    else { return index === TASKS ? index - 1 : index; }
  }
};

const ChunkScreen = () => {
  const { data, loading } = useFetch('http://127.0.0.1:8000/get_corpora/', {
    page: 1,
  });

  // const [page, setPage] = useState(1);

  const [currentChunk, setCurrentChunk] = useState({
    index: null,
    chunk: null,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState(0);
  const [addEntry, setAddEntry] = useState(false);
  const initialState = {
    A: getInitialWord(BagSuccess),
    B: getInitialWord(BagError),
  };

  const [wordData, setData] = useState(initialState);
  const [operation, setOperation] = useState(0);


  useEffect(() => {
    if (parseInt(gender) && notNull(wordData.A.index) && notNull(wordData.B.index)) {
      setAddEntry(true);
    } else {
      setAddEntry(false);
    }
  }, [gender, wordData]);

  useEffect(() => {
    setOperation(getNextOperation(wordData));

    if (currentChunk.index !== null) {
      setCurrentChunk({
        index: currentChunk.index,
        chunk: getSelectedCorpus(
          { fontSize: 24, marginRight: 6 },
          data[currentChunk.index].fields,
          handleWordPress,
          wordData,
        ),
      });
    }
  }, [wordData, operation]); // Explain this later

  useEffect(() => {
    if (currentChunk.index !== null) {
      setData(initialState); // Should bw able to add async await here, read later about async useffect hook
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


  const handleWordPress = (value, offset, index) => () => setData((prevData) => ({
    ...prevData,
    [operationToWord(operation)]: {
      ...prevData[operationToWord(operation)], value, offset, index,
    },
  }));

  return (
    <FlexedContainer>
      {!loading ? (
        <>
          <Title title="Chunks" />
          <ChunksList
            data={data}
            setIndex={setCurrentChunk}
            modelToggle={setModalVisible}
          />
          {currentChunk.index !== null ? (
            <ChunkSelectionModal
              visible={modalVisible}
              data={wordData}
              chunk={currentChunk.chunk}
              setData={setData}
              closeModal={() => setModalVisible(false)}
              gender={gender}
              setGender={setGender}
              addEntry={addEntry}
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
