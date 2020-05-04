import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LeaderboardScreen = () => (
  <View style={styles.container}>
    <Text>LeaderboardScreen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LeaderboardScreen;
