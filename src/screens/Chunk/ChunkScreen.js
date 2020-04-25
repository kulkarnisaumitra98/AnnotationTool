import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { marginStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';
import { useFetch } from './useFetch';

const getCorpus = (corpus, offStart) => {
  let index = 0;
  const texts = corpus.split(' ').map((item, i) => {
    if (index === offStart) {
      index += item.length + 1;

      return (
        <Text key={i}>
          <Text style={{ backgroundColor: 'yellow' }}>{item}</Text>
          {' '}
        </Text>
      );
    }

    index += item.length + 1;

    return (
      <Text key={i}>
        {item}
        {' '}
      </Text>
    );
  });

  return texts;
};

const Row = ({ item }) => (
  <View style={styles.row}>
    <Text>{item.pk}</Text>
    <Text numberOfLines={1} style={[marginStyles.ml_12, {}]}>
      {getCorpus(item.fields.corpus, item.fields.pronoun_off_start)}
    </Text>
  </View>
);

const ChunkScreen = () => {
  const { data, loading } = useFetch('http://127.0.0.1:8000/get_corpora/', { page: 1 });
  const [page, setPage] = useState(1);
  const [moreLoading, setMoreLoading] = useState(false);

  if (!loading) { console.log(data); }

  useEffect(() => {
    setMoreLoading(false);
  }, [page]);

  return (
    <FlexedContainer>
      {!loading ? (
        <>
          <Title title="Chunks" />
          <FlatList
            style={marginStyles.mb_16}
						// data={data.slice(0, page * 12)}
            data={data}
            renderItem={({ item }) => <Row item={item} />}
            keyExtractor={(item) => item.pk.toString()}
          />
          {moreLoading ? (
            <ActivityIndicator size="large" style={marginStyles.mb_32s} />
          ) : null}
        </>
      ) : (
        <ActivityIndicator size="small" style={marginStyles.mt_24} />
      )}
    </FlexedContainer>
  );
};

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

export default ChunkScreen;
