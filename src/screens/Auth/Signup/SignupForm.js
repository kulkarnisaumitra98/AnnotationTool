import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TitledInput from '../../../reusables/components/Inputs/TitledInput/TitledInput';
import { validate } from './Utils';

const PLACEHOLDERCOLOR = '#888';

const SignupForm = () => {
  const [fields, setFields] = useState({
    name: { value: '', err: '' },
    username: { value: '', err: '' },
    password: { value: '', err: '' },
    confPassword: { value: '', err: '' },
  });

  const handleTextChange = (field, value) => {
    const newFields = { ...fields };
    const newField = {
      value,
      err: validate(field, value),
    };

    newFields[field] = newField;

    setFields(newFields);
  };

  const {
    name, username, password, confPassword,
  } = fields;

  return (
    <View style={styles.container}>
      <TitledInput
        config={{
				  placeholder: 'Name',
				  placeholderTextColor: PLACEHOLDERCOLOR,
				  value: name.value,
				  onChangeText: (value) => handleTextChange('name', value),
        }}
        err={name.err}
        mode={2}
      />
      <TitledInput
        config={{
				  placeholder: 'Username',
				  placeholderTextColor: PLACEHOLDERCOLOR,
				  value: username.value,
				  onChangeText: (value) => handleTextChange('username', value),
        }}
        err={username.err}
        mode={2}
      />
      <TitledInput
        config={{
				  placeholder: 'Password',
				  placeholderTextColor: PLACEHOLDERCOLOR,
				  value: password.value,
				  secureTextEntry: true,
				  onChangeText: (value) => handleTextChange('password', value),
        }}
        err={password.err}
        mode={2}
      />
      <TitledInput
        config={{
				  placeholder: 'Confirm Password',
				  placeholderTextColor: PLACEHOLDERCOLOR,
				  value: confPassword.value,
				  secureTextEntry: true,
				  onChangeText: (value) => handleTextChange('confPassword', value),
        }}
        err={confPassword.err}
        mode={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SignupForm;
