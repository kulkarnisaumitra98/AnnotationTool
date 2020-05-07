/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../reusables/components/Button/Button';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import { TEXT_BLACK } from '../../../reusables/styles/colors';
import { paddingStyles } from '../../../reusables/styles/style';

const Table = ({ data, handleRemoveWord }) => {
  const { A, B } = data;

  const isA = A.value !== 'None';
  const isB = B.value !== 'None';

  return (
    <RowContainer contStyle={styles.container}>
      <View style={styles.wordCont}>
        <RowContainer contStyle={paddingStyles.p_0}>
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
            containerStyle={styles.button}
            title="Remove"
            handlePress={() => handleRemoveWord(A.value, A.offset, A.index, true, 0)}
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
        <RowContainer contStyle={paddingStyles.p_0}>
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
            containerStyle={styles.button}
            title="Remove"
            handlePress={() => handleRemoveWord(B.value, B.offset, B.index, true, 1)}
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
    borderWidth: 0,
    marginBottom: 16,
    marginTop: 'auto',
    padding: 0,
    borderRadius: 8,
  },

  wordCont: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    padding: 4,

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  textStyle: {
    // fontWeight: 'bold',
    fontSize: 16,
    color: TEXT_BLACK,
    margin: 8,
  },

  button: {
    backgroundColor: '#ff8469',
    height: 28,
    margin: 8,
  },
});

export default Table;
