import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../reusables/components/Button/Button';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import { BagError, BagSuccess, TEXT_BLACK } from '../../reusables/styles/colors';
import getInitialWord from './Utils/getInitialWord';

const Table = ({
  data, setData,
}) => {
  const {
    A, B,
  } = data;

  const isA = A.value !== 'None';
  const isB = B.value !== 'None';

  return (
    <RowContainer contStyle={styles.container}>
      <View style={styles.wordCont}>
        <RowContainer>
          <Text style={styles.textStyle}>
            Correct Noun =
            {' '}
            <Text
              style={{
							  fontWeight: 'bold',
							  color: isA ? 'green' : TEXT_BLACK,
              }}
            >
              {A.value}
            </Text>
          </Text>
          <Button
            disabled={!isA}
            containerStyle={{ backgroundColor: 'red', height: 28 }}
            title="Remove"
            handlePress={() => setData((prevData) => ({
						    ...prevData,
						    A: getInitialWord(BagSuccess),
						  }))}
          />
        </RowContainer>
        <Text style={styles.textStyle}>
          Offset =
          {' '}
          <Text
            style={{
						  fontWeight: 'bold',
						  color: isA ? 'green' : TEXT_BLACK,
            }}
          >
            {A.offset}
          </Text>
        </Text>
      </View>
      <View style={styles.wordCont}>
        <RowContainer>
          <Text style={styles.textStyle}>
            Misleading Noun =
            {' '}
            <Text
              style={{
							  fontWeight: 'bold',
							  color: isB ? 'red' : TEXT_BLACK,
              }}
            >
              {B.value}
            </Text>
          </Text>
          <Button
            disabled={!isB}
            containerStyle={{ backgroundColor: 'red', height: 28 }}
            title="Remove"
            handlePress={() => setData((prevData) => ({
						    ...prevData,
						    B: getInitialWord(BagError),
						  }))}
          />
        </RowContainer>
        <Text style={styles.textStyle}>
          Offset =
          {' '}
          <Text
            style={{
						  fontWeight: 'bold',
						  color: isB ? 'red' : TEXT_BLACK,
            }}
          >
            {B.offset}
          </Text>
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
