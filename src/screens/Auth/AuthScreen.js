/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { borderStyles } from '../../reusables/styles/style';
import LoginForm from './Login/LoginForm';
import SignupForm from './Signup/SignupForm';

const AuthScreen = (props) => {
  const [ABStyle, setABStyle] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidHide = () => {
    setTimeout(() => setABStyle(false), 0);
  };


  return (
    <FlexedContainer
      contStyle={[
        borderStyles.bw_1,
        { borderColor: 'yellow' },
        ABStyle ? { justifyContent: 'flex-end' } : null,
      ]}
    >
      <LoginForm setABStyle={setABStyle} />
      <SignupForm setABStyle={setABStyle} />
    </FlexedContainer>
  );
};

export default AuthScreen;
