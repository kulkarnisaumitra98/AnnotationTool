/* eslint-disable radix */
/* eslint-disable camelcase */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import UserContext from '../../contexts/UserContext';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { BagError, BagSuccess } from '../../reusables/styles/colors';
import { marginStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';
import useRenderCount from '../Common/useRenderCount';
import ChunkSelectionModal from './ChunkSelectionModal';
import ChunksList from './ChunksList';
import { useFetch } from './useFetch';
import { getSelectedCorpus } from './Utils/corpusProcessing';
import { getNextOperation, getOperationName, operationToWord } from './Utils/general';
import getInitialWord from './Utils/getInitialWord';

axios.defaults.withCredentials = true;

const ChunkScreen = () => {
  const { data, loading } = useFetch(
    'http://127.0.0.1:9996/get_corpora/', { page: 1 },
  );

  const { user } = useContext(UserContext);

  // const [page, setPage] = useState(1);

  const [currentChunk, setCurrentChunk] = useState({
    index: null,
    chunk: null,
  });

  const [modalVisible, setModalVisible] = useState(false);
  // const [gender, setGender] = useState(0);
  const [addEntry, setAddEntry] = useState(false);
  const initialState = {
    A: getInitialWord(BagSuccess),
    B: getInitialWord(BagError),
    gender: 0,
  };

  const [wordData, setData] = useState(initialState);
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

  const handleWordPress = (value, offset, index) => () => {
    if (operation === 2) return;

    setData((prevData) => ({
      ...prevData,
      [operationToWord(operation)]: {
        ...prevData[operationToWord(operation)],
        value,
        offset,
        index,
      },
    }));
  };

  const sendData = async () => {
    const [startA, endA] = wordData.A.offset.split(',').map((item) => parseInt(item));
    const [startB, endB] = wordData.B.offset.split(',').map((item) => parseInt(item));

    // const csrftoken = Cookies.get('csrftoken');

    try {
      const response = await axios.post(
        'http://127.0.0.1:9996/add_entry_user/',
        {
          correct_noun: wordData.A.value,
          correct_noun_off_start: startA,
          correct_noun_off_end: endA,
          mislead_noun: wordData.B.value,
          mislead_noun_off_start: startB,
          mislead_noun_off_end: endB,
          gender: parseInt(wordData.gender) - 1,
          corpus: data[currentChunk.index].pk,
          user: user.id,
          // csrftoken,
        },
      );

      console.log(response.data, 'dd');
    } catch (err) {
      console.log(err);
    }
  };

  useRenderCount();

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
										// gender={gender}
										// setGender={setGender}
              addEntry={addEntry}
              handleAddEntry={sendData}
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
