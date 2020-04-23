/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { borderStyles } from '../../reusables/styles/style';
import LoginForm from './Login/LoginForm';
import SignupForm from './Signup/SignupForm';

const AuthScreen = (props) => {
  const [ABStyle, setABStyle] = useState(false);

  return (
    <FlexedContainer
      contStyle={[
        borderStyles.bw_1,
        { borderColor: 'yellow' },
        ABStyle ? { position: 'absolute', bottom: StatusBar.currentHeight } : null,
      ]}
    >
      <LoginForm setABStyle={setABStyle} />
      <SignupForm setABStyle={setABStyle} />
    </FlexedContainer>
  );
};

export default AuthScreen;
