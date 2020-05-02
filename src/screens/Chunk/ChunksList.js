import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import { marginStyles } from '../../reusables/styles/style';
import { getListItemCorpus } from './Utils/corpusProcessing';

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

const ChunksList = ({
  data, setIndex, modelToggle, corporaToggle,
}) => {
  const Row = ({ fields, index, pk }) => {
    const chunk = getListItemCorpus(
      { fontSize: 20, marginRight: 6 },
      fields,
      corporaToggle,
    );
    return (
      <TouchableOpacity
        onPress={() => {
				  setIndex((prevData) => ({ ...prevData, index }));
				  modelToggle(true);
        }}
        style={styles.row}
      >
        <RowContainer>
          <Text>
            {corporaToggle ? fields.corpus[2] : pk}
          </Text>
          <Text numberOfLines={1} style={[marginStyles.ml_12, {}]}>
            {chunk}
          </Text>
        </RowContainer>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={marginStyles.mb_16}
			// data={data.slice(0, page * 12)}
      data={data}
      renderItem={({ item, index }) => (
        <Row fields={item.fields} index={index} pk={item.pk} />
      )}
      keyExtractor={(item) => item.pk.toString()}
    />
  );
};
export default ChunksList;
