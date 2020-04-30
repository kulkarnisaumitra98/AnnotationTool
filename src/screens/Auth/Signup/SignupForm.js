import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ScreenContext from '../../../contexts/ScreenContext';
import Button from '../../../reusables/components/Button/Button';
import TitledInput from '../../../reusables/components/Inputs/TitledInput/TitledInput';
import { axiosPost } from '../../Common/Utils/axiosConfig';
import { validate } from './Utils';

const PLACEHOLDERCOLOR = '#888';

const getInputConfig = () => ({
  value: '',
  err: { err: true, value: '' },
  typed: false,
});

const SignupForm = () => {
  const context = useContext(ScreenContext);

  const [fields, setFields] = useState({
    name: getInputConfig(),
    username: getInputConfig(),
    password: getInputConfig(),
    confPassword: getInputConfig(),
  });

  const handleTextChange = (field, value) => {
    const newFields = validate(field, value, fields);

    setFields(newFields);
  };

  const handlePress = async () => {
    let newFields = { ...fields };
    let flag = false;
    Object.keys(newFields).map((field) => {
      newFields = validate(field, newFields[field].value, newFields, true);
      if (newFields[field].err.err) { flag = true; }
    });

    if (flag) { setFields(newFields); } else {
      const _data = {
        first_name: name.value,
        username: username.value,
        password: password.value,
      };

      const { data, err, status } = await axiosPost('register/', _data);

      if (status === 200) {
      // console.log(data);
      // context.setScreen(CHUNKSCREEN);
      }
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
          typed={name.typed}
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
          typed={username.typed}
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
          typed={password.typed}
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
          typed={confPassword.typed}
          mode={2}
        />
      </View>
      <Button
				// disabled={isButtonDisabled()}
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
