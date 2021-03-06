import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Cross = ({ closeAction, crossStyle, color }) => (
  <Text style={[styles.cross, crossStyle, { color }]} onPress={closeAction}>
    x
  </Text>
);

const styles = StyleSheet.create({
  cross: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    fontSize: 20,
  },
});

export default Cross;
