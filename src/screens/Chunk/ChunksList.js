import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import { dimensionStyles, marginStyles } from '../../reusables/styles/style';
import { getListItemCorpus } from './Utils/corpusProcessing';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '98%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 16,
    borderRadius: 24,

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

const ChunksList = ({
  data, setIndex, modelToggle, corporaToggle, LoadMoreChunks,
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
        <RowContainer contStyle={dimensionStyles.w_100} justifyContent="flex-start">
          <Text style={{ fontSize: 18, paddingTop: 2 }}>
            {`${index + 1}.`}
          </Text>
          <Text numberOfLines={1} style={[marginStyles.ml_16, { width: '96%', borderWidth: 0 }]}>
            {chunk}
          </Text>
        </RowContainer>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={marginStyles.mb_16}
      scrollEnabled={false}
      data={data}
      renderItem={({ item, index }) => (
        <Row fields={item.fields} index={index} pk={item.pk} />
      )}
      keyExtractor={(item) => item.pk.toString()}
      ListFooterComponent={LoadMoreChunks}
    />
  );
};
export default ChunksList;
