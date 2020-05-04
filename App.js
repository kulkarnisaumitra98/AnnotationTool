import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ScreenContext from './src/contexts/ScreenContext';
import UserContext from './src/contexts/UserContext';
import { WHITE } from './src/reusables/styles/colors';
import { dimensionStyles } from './src/reusables/styles/style';
import Routes from './src/Routes';
import AuthScreen from './src/screens/Auth/AuthScreen';
import ChunkScreen from './src/screens/Chunk/ChunkScreen';

axios.defaults.withCredentials = true;

export const AUTHSCREEN = 0;
export const CHUNKSCREEN = 2;
export const COMPLETEDSCREEN = 1;

const switchScreen = (choice) => {
  switch (choice) {
    case AUTHSCREEN:
      return <AuthScreen />;

    case CHUNKSCREEN:
      return <ChunkScreen screenNumber={1} />;

    case COMPLETEDSCREEN:
      return <ChunkScreen screenNumber={2} />;
    default:
      return <></>;
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
    <ScreenContext.Provider value={{ setScreen, screen }}>
      <UserContext.Provider value={{ user, setUser }}>
        <SafeAreaView style={[styles.container, dimensionStyles.dw]}>
          {/* <FlexedContainer contStyle={(borderStyles.bw_0, paddingStyles.p_0)}>
            <NavBar screen={screen} />
            {switchScreen(screen)}
          </FlexedContainer> */}
          <Routes />
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
    borderWidth: 0,
    borderColor: 'red',
  },
});

export default App;
