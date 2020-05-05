import axios from 'axios';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ScreenContext from './src/contexts/ScreenContext';
import UserContext from './src/contexts/UserContext';
import { WHITE } from './src/reusables/styles/colors';
import { dimensionStyles } from './src/reusables/styles/style';
import Routes from './src/Routes';

axios.defaults.withCredentials = true;

const App = () => {
  const [screen, setScreen] = useState(0);
  const [user, setUser] = useState({
    id: null,
    username: null,
    name: null,
  });


  return (
    <ScreenContext.Provider value={{ setScreen, screen }}>
      <UserContext.Provider value={{ user, setUser }}>
        <SafeAreaView style={[styles.container, dimensionStyles.dw]}>
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
