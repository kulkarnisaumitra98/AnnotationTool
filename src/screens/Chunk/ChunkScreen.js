/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
/* eslint-disable camelcase */
import axios from 'axios';
import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { marginStyles } from '../../reusables/styles/style';
import ChunkSelectionModal from '../Common/ChunkRelated/ChunkSelectionModal';
import ChunkSelectionModalMobile from '../Common/ChunkRelated/ChunkSelectionModalMobile';
import ChunksList from '../Common/ChunkRelated/ChunksList';
import EndComponent from '../Common/ChunkRelated/EndComponent';
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
  } = useChunk(false, navigation, Platform.OS === 'web' ? { fontSize: 24, marginRight: 6 } : { fontSize: 18 });

  // useRenderCount();

  const ChunkAnnotationComponent = Platform.OS === 'web' ? ChunkSelectionModal : ChunkSelectionModalMobile;

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
      LoadMoreChunks={(
        <EndComponent
          handlePress={() => setPage((prevPage) => prevPage + 1)}
          end={end}
          isData={data.length}
        />
)}
    />
    {currentChunk.index !== null ? (
      <ChunkAnnotationComponent
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
