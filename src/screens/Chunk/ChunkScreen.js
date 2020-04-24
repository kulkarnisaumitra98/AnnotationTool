import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { marginStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';
import { useFetch } from './useFetch';

const Row = ({ item }) => (
  <View style={styles.row}>
    <Text>{item.ID}</Text>
    <Text numberOfLines={1} style={[marginStyles.ml_12, {}]}>{item.Excerpt.replace(/\r?\n|\r/g, '')}</Text>
  </View>
);

const ChunkScreen = () => {
  const { data, loading } = useFetch('https://fakerestapi.azurewebsites.net/api/Books');
  const [page, setPage] = useState(1);
  const [moreLoading, setMoreLoading] = useState(false);

  // if (!loading) { console.log(data.slice(0, 10)); }

  useEffect(() => {
    setMoreLoading(false);
  }, [page]);

  return (
    <FlexedContainer>
      {!loading ? (
        <>
          <Title title="Chunks" />
          <FlatList
            data={data.slice(0, page * 12)}
            renderItem={({ item }) => <Row item={item} />}
            keyExtractor={(item) => item.ID.toString()}
            onEndReached={() => {
              if (moreLoading) { setTimeout(() => setPage((prevPage) => prevPage + 1), 4000); }
              setMoreLoading(true);
            }}
            onEndReachedThreshold={0.001}
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
