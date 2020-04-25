/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { marginStyles } from '../../reusables/styles/style';
import Title from '../Common/Title';
import ChunkSelectionModal from './ChunkSelectionWeb';
import { useFetch } from './useFetch';

const getCorpus = (
  { corpus, pronoun_off_start },
  textStyle,
  setData,
  operation,
  modalToggle,
) => {
  let index = 0;

  const texts = corpus.split(' ').map((item, i) => {
    if (index === pronoun_off_start) {
      index += item.length + 1;

      return (
        <Text key={i}>
          <Text style={[{ backgroundColor: 'yellow' }, textStyle]}>{item}</Text>
          {' '}
        </Text>
      );
    }

    index += item.length + 1;

    return (
      <Text
        onPress={() => {
          if (modalToggle) {
            setData((state) => ({
				    ...state,
				    [`word${operation}`]: item,
				    [`word${operation}Offset`]: index,
				  }));
          }
        }}
        key={i}
        style={textStyle}
      >
        {item}
        {' '}
      </Text>
    );
  });

  return texts;
};


const ChunkScreen = () => {
  const { data, loading } = useFetch('http://127.0.0.1:8000/get_corpora/', { page: 1 });
  const [page, setPage] = useState(1);
  const [modalToggle, setModalToggle] = useState({ visible: false, chunk: null });
  const [moreLoading, setMoreLoading] = useState(false);
  const initialState = {
    wordA: 'None',
    wordAOffset: 'None',
    wordB: 'None',
    wordBOffset: 'None',
  };

  const [wordData, setData] = useState(initialState);
  const [operation, setOperation] = useState('A');

  const Row = ({ item }) => {
    const chunk = getCorpus(
      item.fields,
      {
        fontSize: 20,
      },
      setData,
      operation,
      modalToggle,
    );
    return (
      <TouchableOpacity
        onPress={() => {
          setData(initialState);
          setModalToggle({
            visible: true,
            chunk: getCorpus(
              item.fields,
              { fontSize: 24 },
              setData,
              operation,
              modalToggle,
            ),
          });
        }}
        style={styles.row}
      >
        <Text numberOfLines={1} style={[marginStyles.ml_12, {}]}>
          {chunk}
        </Text>
      </TouchableOpacity>
    );
  };


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
          <ChunkSelectionModal
            data={wordData}
            {...modalToggle}
            closeModal={() => setModalToggle({ visible: false, chunk: null })}
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
