import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Test = (props) => {
  const a = 'a\n';
  return (
    <View style={styles.container}>
      <Text>
        hello dfis
        {' '}
        {a}
        {' '}
        fdjsfns
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});

export default Test;
