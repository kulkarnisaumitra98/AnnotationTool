import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BLUE_BUTTON } from '../../styles/colors';
import MyText from './MyText';

const linkColor = BLUE_BUTTON;

const UnderlinedLinkText = ({
  text, textStyle, contStyle, config, handlePress,
}) => (
  <View style={[styles.container, contStyle]}>
    <MyText
      style={[styles.text, textStyle]}
      {...config}
      onPress={handlePress}
    >
      {text}
    </MyText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },

  text: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: linkColor,
    textDecorationColor: linkColor,
    fontSize: 14,
  },
});

export default UnderlinedLinkText;
