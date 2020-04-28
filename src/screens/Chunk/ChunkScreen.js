/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { marginStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';
import ChunkSelectionModal from './ChunkSelectionModal';
import ChunksList from './ChunksList';
import { getCorpus } from './getCorpus';
import { useFetch } from './useFetch';

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

  const initialState = {
    A: { value: 'None', offset: 'None', color: 'red' },
    B: { value: 'None', offset: 'None', color: 'blue' },
  };

  const [wordData, setData] = useState(initialState);
  const [operation, setOperation] = useState(0);

  useEffect(() => {
    setOperation(getNextOperation(wordData));
  }, [wordData]);

  useEffect(() => {
    if (currentChunk.index !== null) {
      setCurrentChunk({
        index: currentChunk.index,
        chunk: getCorpus({ fontSize: 24 }, data[currentChunk.index].fields, handleWordPress),
      });
    }
  }, [currentChunk.index, operation]);

  const handleWordPress = (value, offset) => () => setData((prevData) => ({
    ...prevData,
    [operationToWord(operation)]: { value, offset },
  }));

  return (
    <FlexedContainer>
      {!loading ? (
        <>
          <Title title="Chunks" />
          <ChunksList data={data} setIndex={setCurrentChunk} />
          {currentChunk.index !== null ? (
            <ChunkSelectionModal
              visible={Boolean(currentChunk.index + 1)}
              data={wordData}
              chunk={currentChunk.chunk}
              closeModal={() => setCurrentChunk({ index: null, chunk: null })}
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
