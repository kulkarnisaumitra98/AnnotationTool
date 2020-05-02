import React from 'react';
import { StyleSheet, Text } from 'react-native';

const MyText = ({
  style,
  children,
  onPress,
}) => (
  <Text onPress={onPress} style={[style, styles.text]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    // Define Global texts here
  },
});

export default MyText;
