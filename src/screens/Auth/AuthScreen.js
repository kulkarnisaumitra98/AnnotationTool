import React from 'react';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import KeyBoardView from '../../reusables/components/Containers/KeyboardView';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import { dimensionStyles, positionStyles } from '../../reusables/styles/style';
import Login from './Login/Login';
import Signup from './Signup/Signup';

const AuthScreen = ({ navigation }) => {
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e) => {
  //     // Prevent default behavior
  //     e.preventDefault();

  //     alert('Default behavior prevented');
  //     // Do something manually
  //     // ...
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const content = (
    <>
      <Login />
      <Signup />
    </>
  );
  return dimensionStyles.dw.width <= 400 ? (
    <KeyBoardView contStyle={positionStyles.jcc}>{content}</KeyBoardView>
  ) : (
    <FlexedContainer contStyle={positionStyles.jcc}>
      <RowContainer justifyContent="space-around">{content}</RowContainer>
    </FlexedContainer>
  );
};

export default AuthScreen;
