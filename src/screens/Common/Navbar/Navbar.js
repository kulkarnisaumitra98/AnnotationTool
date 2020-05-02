import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavbarOptions from './NavbarOptions';

const NavBar = ({ screen }) => (
  <View style={styles.container}>
    <NavbarOptions
      optionArr={[
			  { title: 'Leaderboard' },
			  { title: 'Completed' },
			  { title: 'Chunks' },
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
