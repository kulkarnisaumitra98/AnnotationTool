import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BUTTON_ORANGE } from '../../../reusables/styles/colors';
import Title from '../../Common/Title';
import SignupForm from './SignupForm';

const Signup = () => (
  <View style={styles.container}>
    <Title title="Sign Up" />
    <SignupForm />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 0,
  },

  button: {
    backgroundColor: BUTTON_ORANGE,
  },
});

export default Signup;
