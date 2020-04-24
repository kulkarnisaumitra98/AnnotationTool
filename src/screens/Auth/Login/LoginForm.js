
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TitledInput from '../../../reusables/components/Inputs/TitledInput/TitledInput';
import { validate } from './Utils';

const PLACEHOLDERCOLOR = '#888';

const LoginForm = () => {
  const [fields, setFields] = useState({
    username: { value: '', err: '' },
    password: { value: '', err: '' },

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

  const { username, password } = fields;

  return (
    <View style={styles.container}>
      <TitledInput
        config={{
				  placeholder: 'Username',
				  placeholderTextColor: PLACEHOLDERCOLOR,
				  value: username.value,
				  onChangeText: (value) => handleTextChange('username', value),
        }}
        err={username.err}
        mode={1}
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
        mode={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LoginForm;
