import Modal from 'modal-react-native-web';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../reusables/components/Button/Button';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import Cross from '../../../reusables/components/General/Cross';
import { paddingStyles } from '../../../reusables/styles/style';
import Title from '../Title';
import PickerContainer from './PickerContainer';
import SplitWords from './SplitWords';
import Table from './Table';
import { getOperationColor, getOperationName } from './Utils/general';

const ChunkSelectionModal = ({
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
          transparent
        >
          <View style={styles.outerCont}>
            <View style={styles.container}>
              <Cross closeAction={closeModal} />
              <RowContainer
                justifyContent="space-between"
                contStyle={[paddingStyles.p_4]}
              >
                <Title
                  title={addEntry ? 'Done!' : getOperationName(operation)}
                  textStyle={[
									  paddingStyles.p_0,
									  { color: getOperationColor(operation) },
                  ]}
                />
                <View style={{ flexDirection: 'row' }}>
                  <PickerContainer
                    gender={tableData.gender}
                    setGender={setTableData}
                  />
                  <Button
                    disabled={disabled}
                    title={completed ? 'Update Entry' : 'Add Entry'}
                    handlePress={handleAddEntry}
                    containerStyle={styles.button}
                    textStyle={{ fontWeight: 'bold' }}
                  />
                </View>
              </RowContainer>
              <ScrollView>
                <Text>
                  <SplitWords
                    processedWords={processedWords}
                    handlePressWord={handlePressWord}
                  />
                </Text>
              </ScrollView>
              <Table data={tableData} handleRemoveWord={handlePressWord} />
            </View>
          </View>
        </Modal>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  outerCont: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000070',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    position: 'relative',
    backgroundColor: '#fff',
    width: '80%',
    height: 400,
    marginTop: 'auto',
    marginBottom: 'auto',
    borderWidth: 0,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    height: 28,
    marginRight: 24,
    marginLeft: 16,
  },
});

export default ChunkSelectionModal;
