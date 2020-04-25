import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { marginStyles } from '../../reusables/styles/style';
import getCorpus from './getCorpus';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    borderRadius: 24,
  },
});

const ChunksList = ({ data, setModalToggle, handleOperation }) => {
  const Row = ({ fields }) => {
    const chunk = getCorpus({ fontSize: 20 }, fields, handleOperation);
    return (
      <TouchableOpacity
        onPress={() => setModalToggle({ visible: true, chunk })}
        style={styles.row}
      >
        <Text numberOfLines={1} style={[marginStyles.ml_12, {}]}>
          {chunk}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={marginStyles.mb_16}
			// data={data.slice(0, page * 12)}
      data={data}
      renderItem={({ item }) => <Row fields={item.fields} />}
      keyExtractor={(item) => item.pk.toString()}
    />
  );
};
export default ChunksList;
