import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../reusables/components/Button/Button';
import Title from '../../Common/Title';
import LoginForm from './LoginForm';

const Login = (props) => (
  <View style={styles.container}>
    <Title title="Log In" />
    <LoginForm />
    <Button title="Log In" />
  </View>
);

const styles = StyleSheet.create({
  container: {},
});

export default Login;
