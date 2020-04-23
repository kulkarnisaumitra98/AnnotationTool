import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../reusables/components/Button/Button';
import Title from '../../Common/Title';
import Form from '../Form';
import { getFields } from './Utils';

const LoginForm = (props) => (
  <View style={styles.container}>
    <Title title="Log In" />
    <Form formConfig={getFields({ onFocus: () => props.setABStyle(false) })} />
    <Button title="Log In" />
  </View>
);

const styles = StyleSheet.create({
  container: {},
});

export default LoginForm;
