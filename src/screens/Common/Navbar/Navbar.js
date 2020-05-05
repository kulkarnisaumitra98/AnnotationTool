import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavbarOptions from './NavbarOptions';

const NavBar = () => (
  <View style={styles.container}>
    <NavbarOptions
      optionArr={[
			  { title: 'Chunks' },
			  { title: 'Completed' },
			  { title: 'Leaderboard' },
      ]}
      index={0}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default NavBar;
