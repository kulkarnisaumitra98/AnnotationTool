import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, View } from 'react-native';
import UserContext from '../../contexts/UserContext';

const InitScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((userString) => {
        if (userString) {
          setUser(JSON.parse(userString));
          navigation.navigate('Tabs');
        } else {
          navigation.navigate('Auth');
        }
      })
      .catch((err) => {
        console.log(err);
        navigation.navigate('Auth');
      });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InitScreen;
