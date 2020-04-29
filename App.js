import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ScreenContext from './src/contexts/ScreenContext';
import UserContext from './src/contexts/UserContext';
import FlexedContainer from './src/reusables/components/Containers/FlexedContainer';
import { WHITE } from './src/reusables/styles/colors';
import { borderStyles, paddingStyles } from './src/reusables/styles/style';
import AuthScreen from './src/screens/Auth/AuthScreen';
import ChunkScreen from './src/screens/Chunk/ChunkScreen';

axios.defaults.withCredentials = true;

export const AUTHSCREEN = 'AuthScreen';
export const CHUNKSCREEN = 'CHUNKSCREEN';

const switchScreen = (choice) => {
  switch (choice) {
    case AUTHSCREEN:
      return <AuthScreen />;

    case CHUNKSCREEN:
      return <ChunkScreen />;

    default:
      return <AuthScreen />;
  }
};

const App = () => {
  const [screen, setScreen] = useState(AUTHSCREEN);
  const [user, setUser] = useState({
    id: null,
    username: null,
    name: null,
  });
  return (
    <ScreenContext.Provider value={{ setScreen }}>
      <UserContext.Provider value={{ user, setUser }}>
        <SafeAreaView style={styles.container}>
          <FlexedContainer contStyle={(borderStyles.bw_0, paddingStyles.p_0)}>
            {switchScreen(screen)}
          </FlexedContainer>
        </SafeAreaView>
      </UserContext.Provider>
    </ScreenContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    marginTop: StatusBar.currentHeight,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default App;
