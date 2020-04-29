import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../../reusables/components/Button/Button';
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

  const handlePress = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:9996/register/', {
          first_name: name.value,
          username: username.value,
          password: password.value,
        },
      );

      console.log(response.data, 'dd');
    } catch (err) {
      console.log(err);
    }
  };

  const {
    name, username, password, confPassword,
  } = fields;

  return (
    <>
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
      <Button
        title="Sign Up"
        containerStyle={styles.button}
        textStyle={{ fontWeight: 'bold' }}
        handlePress={handlePress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SignupForm;
