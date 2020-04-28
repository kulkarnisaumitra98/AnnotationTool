import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import FlexedContainer from './src/reusables/components/Containers/FlexedContainer';
import { WHITE } from './src/reusables/styles/colors';
import { borderStyles, paddingStyles } from './src/reusables/styles/style';
import AuthScreen from './src/screens/Auth/AuthScreen';
import ChunkScreen from './src/screens/Chunk/ChunkScreen';

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

const App = () => (
  <SafeAreaView style={styles.container}>
    <FlexedContainer contStyle={(borderStyles.bw_0, paddingStyles.p_0)}>
      {switchScreen(CHUNKSCREEN)}
    </FlexedContainer>
  </SafeAreaView>
);

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
