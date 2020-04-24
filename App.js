import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import FlexedContainer from './src/reusables/components/Containers/FlexedContainer';
import { WHITE } from './src/reusables/styles/colors';
import { borderStyles, paddingStyles } from './src/reusables/styles/style';
import AuthScreen from './src/screens/Auth/AuthScreen';

const App = () => (
  <SafeAreaView style={styles.container}>
    <FlexedContainer contStyle={(borderStyles.bw_0, paddingStyles.p_0)}>
      <AuthScreen />
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
