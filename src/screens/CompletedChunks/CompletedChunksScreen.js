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

const CompletedChunksScreen = ({ navigation }) => {
  const {
    err,
    end,
    data,
    loading,
    setPage,
    currentIndex,
    setCurrentIndex,
    modalVisible,
    setModalVisible,
    allDone,
    wordData,
    setWordData,
    operation,
    dataToServer,
    processedWords,
    handlePressWord,
    updated,
    setUpdated,
  } = useChunk(true, navigation);

  // useRenderCount();

  const ChunkAnnotationComponent = Platform.OS === 'web' ? ChunkSelectionModal : ChunkSelectionModalMobile;


  return (
    <FlexedContainer contStyle={marginStyles.mt_12}>
      {!loading ? (
			  !err ? (
  <>
    <ChunksList
      data={data}
      processedWords={processedWords}
      setIndex={setCurrentIndex}
      modelToggle={setModalVisible}
      corporaToggle
      LoadMoreChunks={(
        <EndComponent
          handlePress={() => setPage((prevPage) => prevPage + 1)}
          end={end}
          isData={data.length}
        />
)}
    />
    {currentIndex !== null ? (
      <ChunkAnnotationComponent
        processedWords={processedWords}
        visible={modalVisible}
        data={wordData}
        tableData={wordData}
        index={currentIndex}
        setTableData={setWordData}
        closeModal={() => setModalVisible(false)}
        addEntry={allDone}
        handleAddEntry={dataToServer}
        setCurrentIndex={setCurrentIndex}
        operation={operation}
        handlePressWord={handlePressWord}
        completed
        updated
        setUpdated={setUpdated}
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

export default CompletedChunksScreen;
