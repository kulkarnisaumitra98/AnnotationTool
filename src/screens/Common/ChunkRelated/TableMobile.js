import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import { TEXT_BLACK } from '../../../reusables/styles/colors';
import { paddingStyles } from '../../../reusables/styles/style';

const TableMobile = ({ data, setData, setIsRemovalOp }) => {
  const { A, B } = data;

  const isA = A.value !== 'None';
  const isB = B.value !== 'None';

  return (
    <View style={styles.container}>
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
          <TouchableOpacity
            disabled={!isA}
            onPress={() => setIsRemovalOp({ value: true, op: 0 })}
          >
            <Entypo
              name="circle-with-cross"
              size={24}
              color={!isB ? 'grey' : 'red'}
            />
          </TouchableOpacity>
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
          <TouchableOpacity
            disabled={!isB}
            onPress={() => setIsRemovalOp({ value: true, op: 1 })}
          >
            <Entypo
              name="circle-with-cross"
              size={24}
              color={!isB ? 'grey' : 'red'}
            />
          </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },

  wordCont: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    padding: 4,
    marginTop: 16,

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
    // fontSize: 16,
    color: TEXT_BLACK,
    margin: 8,
  },

  button: {
    backgroundColor: '#ff8469',
    height: 28,
    margin: 8,
  },
});

export default TableMobile;
