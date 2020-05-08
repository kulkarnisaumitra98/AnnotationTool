import React, { useContext } from 'react';
import { AsyncStorage } from 'react-native';
import UserContext from '../../contexts/UserContext';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import KeyBoardView from '../../reusables/components/Containers/KeyboardView';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import { dimensionStyles, positionStyles } from '../../reusables/styles/style';
import { sendAlert } from '../Common/Utils/alert';
import Login from './Login/Login';
import Signup from './Signup/Signup';

const AuthScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();

      AsyncStorage.removeItem('user').then(() => {
        sendAlert('Logged Out');
        navigation.navigate('Auth');
        setUser(null);
      });
    });

    return unsubscribe;
  }, [navigation]);

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
