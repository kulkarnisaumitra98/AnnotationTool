import React from 'react';
import { StyleSheet } from 'react-native';
import MyText from '../../../reusables/components/Texts/MyText';
import { WHITE } from '../../../reusables/styles/colors';

const NavButton = ({
  title, selected, handlePress, index,
}) => (
  <MyText
    onPress={() => handlePress(index)}
    style={[styles.title, selected ? { backgroundColor: '#ffffff40' } : null]}
  >
    {title}
  </MyText>
);

const styles = StyleSheet.create({
  title: {
    padding: 8,
    width: 150,
    margin: 4,
    fontSize: 16,
    color: WHITE,
    textAlign: 'center',
    borderRadius: 4,
    fontWeight: '100',
  },
});

export default NavButton;
