/* eslint-disable no-underscore-dangle */

import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CHUNKSCREEN } from '../../../../App';
import ScreenContext from '../../../contexts/ScreenContext';
import UserContext from '../../../contexts/UserContext';
import Button from '../../../reusables/components/Button/Button';
import TitledInput from '../../../reusables/components/Inputs/TitledInput/TitledInput';
import { axiosPost } from '../../Common/Utils/axiosConfig';


const PLACEHOLDERCOLOR = '#888';

const LoginForm = () => {
  const context = useContext(ScreenContext);
  const userContext = useContext(UserContext);

  const [fields, setFields] = useState({
    username: { value: '' },
    password: { value: '' },
  });

  const handleTextChange = (field, value) => {
    const newFields = { ...fields };
    // const validated = validate(field, value);
    const newField = {
      value,
    };

    newFields[field] = newField;

    setFields(newFields);
  };

  const handlePress = async () => {
    const _data = {
      username: username.value,
      password: password.value,
    };

    const { data, err, status } = await axiosPost('login/', _data);

    if (status === 200) {
      userContext.setUser({
        ...data,
      });
      context.setScreen(CHUNKSCREEN);
    }
  };


  const { username, password } = fields;

  return (
    <>
      <View style={styles.container}>
        <TitledInput
          config={{
					  placeholder: 'Username',
					  placeholderTextColor: PLACEHOLDERCOLOR,
					  value: username.value,
					  onChangeText: (value) => handleTextChange('username', value),
          }}
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
          mode={1}
        />
      </View>
      <Button
        title="Log In"
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

export default LoginForm;
