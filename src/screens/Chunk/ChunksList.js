import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { marginStyles } from '../../reusables/styles/style';
import { getCorpusList } from './getCorpus';

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

const ChunksList = ({ data, setIndex }) => {
  const Row = ({ fields, index }) => {
    const chunk = getCorpusList({ fontSize: 20 }, fields);
    return (
      <TouchableOpacity
        onPress={() => setIndex((prevData) => ({ ...prevData, index }))}
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
      renderItem={({ item, index }) => <Row fields={item.fields} index={index} />}
      keyExtractor={(item) => item.pk.toString()}
    />
  );
};
export default ChunksList;
