import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BUTTON_GREEN } from '../../../reusables/styles/colors';
import { dimensionStyles } from '../../../reusables/styles/style';
import Title from '../../Common/Title';
import LoginForm from './LoginForm';

const Login = () => (
  <View style={styles.container}>
    <Title title="Log In" />
    <LoginForm />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: dimensionStyles.dw.width <= 400 ? 0 : 16,
  },
  button: {
    backgroundColor: BUTTON_GREEN,
  },
});

export default Login;
