import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import { TEXT_BLACK } from '../../reusables/styles/colors';

const Table = ({
  data,
}) => {
  console.log(data, 'Hellllooooooooo');
  const {
    A, B,
  } = data;

  return (
    <RowContainer contStyle={styles.container}>
      <View style={styles.wordCont}>
        <Text style={styles.textStyle}>
          Correct Noun =
          {' '}
          <Text style={{ fontWeight: 'bold' }}>{A.value}</Text>
        </Text>
        <Text style={styles.textStyle}>
          Offset =
          {' '}
          <Text style={{ fontWeight: 'bold' }}>{A.offset}</Text>
        </Text>
      </View>
      <View style={styles.wordCont}>
        <Text style={styles.textStyle}>
          Misleading Noun =
          {' '}
          <Text style={{ fontWeight: 'bold' }}>{B.value}</Text>
        </Text>
        <Text style={styles.textStyle}>
          Offset =
          {' '}
          <Text style={{ fontWeight: 'bold' }}>{B.offset}</Text>
        </Text>
      </View>
    </RowContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    marginBottom: 16,
    marginTop: 'auto',
    padding: 0,
    borderRadius: 8,
  },

  wordCont: {
    width: '50%',
    borderRightWidth: 1,
    // borderRadius: 8,
  },

  textStyle: {
    // fontWeight: 'bold',
    fontSize: 20,
    color: TEXT_BLACK,
    margin: 8,
  },
});

export default Table;
