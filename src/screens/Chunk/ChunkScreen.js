/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
/* eslint-disable camelcase */
import axios from 'axios';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import AlertText from '../../reusables/components/Texts/AlertText';
import UnderlinedLinkText from '../../reusables/components/Texts/UnderlinedLinkText';
import { marginStyles } from '../../reusables/styles/style';
import ChunkSelectionModal from '../Common/ChunkRelated/ChunkSelectionModal';
import ChunksList from '../Common/ChunkRelated/ChunksList';
import useChunk from '../Common/ChunkRelated/useChunk';
import { sendAlert } from '../Common/Utils/alert';

axios.defaults.withCredentials = true;

const ChunkScreen = ({ navigation }) => {
  const {
    err,
    end,
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
    setIsRemovalOp,
  } = useChunk(false, navigation);

  // useRenderCount();

  return (
    <FlexedContainer contStyle={marginStyles.mt_12}>
      {!loading ? (
			  !err ? (
  <>
    <ChunksList
      data={data}
      setIndex={setCurrentChunk}
      modelToggle={setModalVisible}
      corporaToggle={false}
      LoadMoreChunks={
								!end ? (
								  data.length ? (
  <UnderlinedLinkText
    text="Load More Chunks"
    handlePress={() => setPage((prevPage) => prevPage + 1)}
  />
								  ) : (
  <AlertText
    text="No annotations, Get to work!!!"
    type="error"
  />
								  )
								) : null
							}
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
        completed={false}
        operation={operation}
        setIsRemovalOp={setIsRemovalOp}
      />
    ) : null}
  </>
			  ) : (
  <>{sendAlert(err)}</>
			  )
      ) : (
        <ActivityIndicator size="small" style={marginStyles.mt_24} />
      )}
    </FlexedContainer>
  );
};

export default ChunkScreen;
