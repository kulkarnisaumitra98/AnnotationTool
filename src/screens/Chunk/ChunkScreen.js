/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { marginStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';
import ChunkSelectionModal from './ChunkSelectionModal';
import ChunksList from './ChunksList';
import { useFetch } from './useFetch';

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

const ChunkScreen = () => {
  const { data, loading } = useFetch('http://127.0.0.1:9765/get_corpora/', { page: 1 });
  const [page, setPage] = useState(1);
  const [modalToggle, setModalToggle] = useState({ visible: false, chunk: null });
  const [moreLoading, setMoreLoading] = useState(false);
  const initialState = {
    A: { value: 'None', offset: 'None' },
    B: { value: 'None', offset: 'None' },
  };

  const [wordData, setData] = useState(initialState);
  const [operation, setOperation] = useState(0);

  // if (!loading) { console.log(data); }

  useEffect(() => {
    setMoreLoading(false);
  }, [page]);

  return (
    <FlexedContainer>
      {!loading ? (
        <>
          <Title title="Chunks" />
          <ChunksList
            data={data}
            setModalToggle={setModalToggle}
            handleOperation={(value, offset) => () => setData((prevData) => {
              console.log(offset, 'offset');
              return ({
						    ...prevData,
						    [operationToWord(operation)]: { value, offset },
						  });
            })}
          />
          <ChunkSelectionModal
            data={wordData}
            {...modalToggle}
            closeModal={() => setModalToggle({ visible: false, chunk: null })}
          />
          {moreLoading ? (
            <ActivityIndicator size="large" style={marginStyles.mb_32s} />
          ) : null}
        </>
      ) : (
        <ActivityIndicator size="small" style={marginStyles.mt_24} />
      )}
    </FlexedContainer>
  );
};


export default ChunkScreen;
