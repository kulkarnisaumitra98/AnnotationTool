import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BLUE_BUTTON, WHITE } from '../../styles/colors';
import { dimensionStyles } from '../../styles/style';
import MyText from '../Texts/MyText';

const Button = ({
  handlePress,
  long,
  title,
  containerStyle,
  textStyle,
  disabled,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[
		  styles.container,
		  containerStyle,
		  long ? dimensionStyles.w_100 : null,
		  disabled ? { backgroundColor: '#A6ABBA', elevation: 0, shadowColor: '#fff' } : null,
    ]}
    onPress={handlePress}
  >
    <MyText
      style={[styles.text, textStyle, disabled ? { color: '#EBEBEB' } : null]}
    >
      {title}
    </MyText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: BLUE_BUTTON,
    borderRadius: 4,

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  text: {
    color: WHITE,
    fontSize: 14,
  },
});

export default Button;
