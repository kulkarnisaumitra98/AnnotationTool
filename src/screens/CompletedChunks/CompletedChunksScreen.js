/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
/* eslint-disable camelcase */
import axios from 'axios';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import UnderlinedLinkText from '../../reusables/components/Texts/UnderlinedLinkText';
import { marginStyles } from '../../reusables/styles/style';
import ChunkSelectionModal from '../Common/ChunkRelated/ChunkSelectionModal';
import ChunksList from '../Common/ChunkRelated/ChunksList';
import useChunk from '../Common/ChunkRelated/useChunk';

axios.defaults.withCredentials = true;

const CompletedChunksScreen = () => {
  const {
    data,
    loading,
    setPage,
    currentChunk,
    setCurrentChunk,
    modalVisible,
    setModalVisible,
    allDone,
    wordData,
    setWordData,
    operation,
    dataToServer,
  } = useChunk(true);

  // useRenderCount();

  return (
    <FlexedContainer contStyle={marginStyles.mt_12}>
      {!loading ? (
        <>
          <ChunksList
            data={data}
            setIndex={setCurrentChunk}
            modelToggle={setModalVisible}
            corporaToggle
            LoadMoreChunks={(
              <UnderlinedLinkText
                text="Load More Chunks"
                handlePress={() => setPage((prevPage) => prevPage + 1)}
              />
              )}
          />
          {currentChunk.index !== null ? (
            <ChunkSelectionModal
              visible={modalVisible}
              data={wordData}
              chunk={currentChunk}
              setData={setWordData}
              closeModal={() => setModalVisible(false)}
              addEntry={allDone}
              handleAddEntry={dataToServer}
              setCurrentChunk={setCurrentChunk}
              operation={operation}
              completed
            />
          ) : null}
        </>
      ) : (
        <ActivityIndicator size="small" style={marginStyles.mt_24} />
      )}
    </FlexedContainer>
  );
};

export default CompletedChunksScreen;
