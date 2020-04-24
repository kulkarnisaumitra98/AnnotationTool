import React from 'react';
import KeyBoardView from '../../reusables/components/Containers/KeyboardView';
import { positionStyles } from '../../reusables/styles/style';
import Login from './Login/Login';
import Signup from './Signup/Signup';

const AuthScreen = () => (
  <KeyBoardView contStyle={positionStyles.jcc}>
    <Login />
    <Signup />
  </KeyBoardView>
);

export default AuthScreen;
