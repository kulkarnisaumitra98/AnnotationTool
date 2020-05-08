import React from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import { marginStyles } from '../../../reusables/styles/style';

const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: isWeb ? 16 : 8,
    marginBottom: 16,
  },

  textStyle: {
    fontSize: isWeb ? 18 : 16,
  },

});

const ChunksList = ({
  data, setIndex, modelToggle, corporaToggle, LoadMoreChunks,
}) => {
  const Row = ({ fields, index, pk }) => (
    <TouchableOpacity
      onPress={() => {
			  setIndex(index);
			  modelToggle(true);
      }}
      style={[styles.row, index % 2 ? { backgroundColor: '#f4f4f4' } : null]}
    >
      <RowContainer contStyle={{ width: '95%' }} justifyContent="flex-start">
        <Text style={styles.textStyle}>{`${index + 1}.`}</Text>
        <Text
          numberOfLines={1}
          style={[marginStyles.ml_16, { width: '96%' }, styles.textStyle]}
        >
          {corporaToggle ? fields.corpus[0] : fields.corpus}
        </Text>
      </RowContainer>
    </TouchableOpacity>
  );
  return (
    <FlatList
      style={marginStyles.mb_16}
      scrollEnabled={Platform.OS !== 'web'}
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
