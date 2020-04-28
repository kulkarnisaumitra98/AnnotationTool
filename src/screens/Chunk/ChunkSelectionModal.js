import Modal from 'modal-react-native-web';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../reusables/components/Button/Button';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import Cross from '../../reusables/components/General/Cross';
import { borderStyles, paddingStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';
import PickerContainer from './PickerContainer';
import Table from './Table';

const ChunkSelectionModal = ({
  visible,
  closeModal,
  data,
  chunk,
  setData,
  gender,
  setGender,
  addEntry,
}) => (
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
          <Title title="Current Operation" textStyle={paddingStyles.p_0} />
          <View style={{ flexDirection: 'row' }}>
            <PickerContainer gender={gender} setGender={setGender} />
            <Button
              disabled={!addEntry}
              title="Add Entry"
              handlePress={() => {}}
              containerStyle={styles.button}
              textStyle={{ fontWeight: 'bold' }}
            />
          </View>
        </RowContainer>
        <ScrollView>
          <RowContainer
            justifyContent="flex-start"
            contStyle={[borderStyles.bw_0, styles.rowCont]}
          >
            {chunk}
          </RowContainer>
        </ScrollView>
        <Table data={data} setData={setData} />
      </View>
    </View>
  </Modal>
);
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
    flexWrap: 'wrap',
    marginTop: 8,
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

export default ChunkSelectionModal;
