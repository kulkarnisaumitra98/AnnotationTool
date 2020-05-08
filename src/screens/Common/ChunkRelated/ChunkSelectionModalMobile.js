import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import { SUCCESS_TEXT } from '../../../reusables/styles/colors';
import { paddingStyles } from '../../../reusables/styles/style';
import Title from '../Title';
import PickerContainer from './PickerContainer';
import SplitWords from './SplitWords';
import TableMobile from './TableMobile';
import { getOperationColor, getOperationName } from './Utils/general';

const ChunkSelectionModalMobile = ({
  visible,
  closeModal,
  tableData,
  setTableData,
  addEntry,
  handleAddEntry,
  operation,
  completed,
  processedWords,
  handlePressWord,
  updated,
}) => {
  const disabled = ((!addEntry || !updated) && completed) || (!addEntry && !completed);

  return (
    <>
      {processedWords ? (
        <Modal
          visible={visible}
          onRequestClose={closeModal}
          animationType="slide"
          transparent={false}
        >
          <View style={styles.container}>
            <RowContainer
              contStyle={styles.header}
              justifyContent="space-between"
            >
              <TouchableOpacity onPress={closeModal}>
                <MaterialIcons name="arrow-back" size={24} />
              </TouchableOpacity>
              <Title
                title={addEntry ? 'Done!' : getOperationName(operation)}
                textStyle={[
								  paddingStyles.p_0,
								  { color: getOperationColor(operation), fontSize: 18 },
                ]}
              />
              <TouchableOpacity disabled={disabled} onPress={handleAddEntry}>
                {!completed ? (
                  <AntDesign
                    name="pluscircle"
                    size={24}
                    color={disabled ? 'grey' : SUCCESS_TEXT}
                  />
                ) : (
                  <MaterialIcons
                    name="update"
                    size={24}
                    color={disabled ? 'grey' : SUCCESS_TEXT}
                  />
                )}
              </TouchableOpacity>
            </RowContainer>

            <ScrollView>
              <View style={styles.wrapWords}>
                <SplitWords
                  processedWords={processedWords}
                  handlePressWord={handlePressWord}
                />
              </View>
            </ScrollView>
            <PickerContainer
              gender={tableData.gender}
              setGender={setTableData}
            />
            <TableMobile data={tableData} handleRemoveWord={handlePressWord} />
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
    borderWidth: 1,
    flex: 1,
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

  wrapWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  header: {
    padding: 2,
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 16,
  },
});

export default ChunkSelectionModalMobile;
