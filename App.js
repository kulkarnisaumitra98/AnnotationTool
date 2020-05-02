import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ScreenContext from './src/contexts/ScreenContext';
import UserContext from './src/contexts/UserContext';
import FlexedContainer from './src/reusables/components/Containers/FlexedContainer';
import { WHITE } from './src/reusables/styles/colors';
import { borderStyles, dimensionStyles, paddingStyles } from './src/reusables/styles/style';
import AuthScreen from './src/screens/Auth/AuthScreen';
import ChunkScreen from './src/screens/Chunk/ChunkScreen';
import NavBar from './src/screens/Common/Navbar/Navbar';

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
          <FlexedContainer contStyle={(borderStyles.bw_0, paddingStyles.p_0)}>
            <NavBar screen={screen} />
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
    borderWidth: 0,
    borderColor: 'red',
  },
});

export default App;
