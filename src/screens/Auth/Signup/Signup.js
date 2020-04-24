import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../reusables/components/Button/Button';
import Title from '../../Common/Title';
import SignupForm from './SignupForm';

const Signup = () => (
  <View style={styles.container}>
    <Title title="Sign Up" />
    <SignupForm />
    <Button title="Sign Up" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderWidth: 0,
  },
});

export default Signup;
