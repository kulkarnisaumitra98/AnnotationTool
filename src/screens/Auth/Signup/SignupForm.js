import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../reusables/components/Button/Button';
import Title from '../../Common/Title';
import Form from '../Form';
import { getFields, validate } from './Utils';

const SignupForm = (props) => (
  <View style={styles.container}>
    <Title title="Sign Up" />
    <Form
      formConfig={getFields({ onFocus: () => props.setABStyle(true) })}
      // formConfig={getFields()}
      validateForm={validate}
    />
    <Button title="Sign Up" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    // borderWidth: 1,
    // flex: 1,
    // justifyContent: 'flex-end',
    // backgroundColor: '#fff',
    // zIndex: 2,
    // position: 'absolute',
  },
});

export default SignupForm;
