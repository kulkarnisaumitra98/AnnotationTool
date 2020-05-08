import React from 'react';
import { Picker, Platform, StyleSheet, View } from 'react-native';

const isWeb = Platform.OS === 'web';

const PickerContainer = ({ setGender, gender }) => (
  <View style={[styles.container, !isWeb ? { justifyContent: 'center' } : null]}>
    <Picker
      selectedValue={gender}
      onValueChange={(value) => setGender(value)}
      style={{ alignItems: 'center' }}
    >
      <Picker.Item label="--Select Gender--" value={0} />
      <Picker.Item label="Male" value={1} />
      <Picker.Item label="Female" value={2} />
      <Picker.Item label="Context Not Enough" value={3} />
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: isWeb ? 0 : 1,
    borderColor: '#ddd',
    height: 38,
    borderRadius: 4,
    marginTop: isWeb ? 0 : 16,
  },
});

export default PickerContainer;
