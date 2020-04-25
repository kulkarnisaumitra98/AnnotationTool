import React from 'react';
import { Picker, StyleSheet, View } from 'react-native';

const PickerContainer = (props) => (
  <View style={styles.container}>
    <Picker
      selectedValue="java"
      style={{ alignItems: 'center' }}
    >
      <Picker.Item label="--Select Gender--" value="0" />
      <Picker.Item label="Male" value="1" />
      <Picker.Item label="Female" value="2" />
      <Picker.Item label="Context Not Enough" value="3" />
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: {

  },
});

export default PickerContainer;
