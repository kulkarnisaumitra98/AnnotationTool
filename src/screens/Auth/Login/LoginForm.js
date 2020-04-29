
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CHUNKSCREEN } from '../../../../App';
import ScreenContext from '../../../contexts/ScreenContext';
import UserContext from '../../../contexts/UserContext';
import Button from '../../../reusables/components/Button/Button';
import TitledInput from '../../../reusables/components/Inputs/TitledInput/TitledInput';
import { validate } from '../Signup/Utils';


const PLACEHOLDERCOLOR = '#888';

const LoginForm = () => {
  const context = useContext(ScreenContext);
  const userContext = useContext(UserContext);

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

  const handlePress = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:9996/login/', {
        username: username.value,
        password: password.value,
      });

      if (response.status === 200) {
        userContext.setUser({
          ...response.data,
        });
        context.setScreen(CHUNKSCREEN);
      }
      console.log(response, 'login');
    } catch (err) {
      console.log(err);
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
