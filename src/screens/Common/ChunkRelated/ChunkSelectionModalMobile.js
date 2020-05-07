import { AntDesign } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { ActivityIndicator, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import { SUCCESS_TEXT } from '../../../reusables/styles/colors';
import { paddingStyles } from '../../../reusables/styles/style';
import Title from '../Title';
import Table from './Table';
import TableMobile from './TableMobile';
import { getOperationColor, getOperationName } from './Utils/general';

const ChunkSelectionModalMobile = ({
  visible,
  closeModal,
  data,
  chunk,
  setData,
  addEntry,
  handleAddEntry,
  operation,
  setCurrentChunk,
  completed,
  setIsRemovalOp,
}) => {
  useEffect(() => {
    if (completed && chunk.chunk) {
      // console.log(chunk.updated, 'fds');
      setCurrentChunk((prevChunk) => ({ ...prevChunk, updated: true }));
    }
  }, [data]);

  // console.log(chunk.chunk?.map((item) => item.props.children));

  const disabled =		((!addEntry || !chunk.updated) && completed) || (!addEntry && !completed);
  const TableComponent = Platform.OS === 'web' ? Table : TableMobile;

  return (
    <>
      {chunk.chunk ? (
        <Modal
          visible={visible}
          onRequestClose={closeModal}
          animationType="slide"
          transparent={false}
        >
          <View style={styles.container}>
            <RowContainer
              contStyle={{ padding: 2, alignItem: 'center', marginBottom: 12 }}
              justifyContent="space-between"
            >
              <Title
                title={addEntry ? 'Done!' : getOperationName(operation)}
                textStyle={[
								  paddingStyles.p_0,
								  { color: getOperationColor(operation), fontSize: 18 },
                ]}
              />
              <TouchableOpacity
                disabled={disabled}
                handlePress={handleAddEntry}
              >
                <AntDesign
                  name="pluscircle"
                  size={24}
                  color={disabled ? 'grey' : SUCCESS_TEXT}
                />
              </TouchableOpacity>
            </RowContainer>
            <Text>{chunk.chunk}</Text>
            <TableComponent
              data={data}
              setData={setData}
              setIsRemovalOp={setIsRemovalOp}
            />
          </View>
        </Modal>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};
const styles = StyleSheet.create({

  container: {
    position: 'relative',
    backgroundColor: '#fff',
    width: '100%',
    borderWidth: 0,
    padding: 16,
  },

  chunkCont: {
    flexDirection: 'row',
    width: '%',
    borderWidth: 0,
  },

  rowCont: {
    // flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 8,
    padding: 8,
    paddingTop: 0,
    paddingLeft: 0,
  },

  button: {
    // backgroundColor: BUTTON_GREEN,
    // height: 40,
    marginRight: 24,
    marginLeft: 16,
  },
});

export default ChunkSelectionModalMobile;
