/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
import { FontAwesome, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { AsyncStorage, Platform } from 'react-native';
import ScreenContext from './contexts/ScreenContext';
import UserContext from './contexts/UserContext';
import { isMountedRef, navigate, navigationRef } from './reusables/functions/NavigatorService';
import { BLUE_BUTTON } from './reusables/styles/colors';
import AuthScreen from './screens/Auth/AuthScreen';
import ChunkScreen from './screens/Chunk/ChunkScreen';
import NavBar from './screens/Common/Navbar/Navbar';
import { sendAlert } from './screens/Common/Utils/alert';
import CompletedChunksScreen from './screens/CompletedChunks/CompletedChunksScreen';
import InitScreen from './screens/Init/InitScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabRoutes = () => (
  <Tab.Navigator
    tabBarOptions={{
		  activeTintColor: BLUE_BUTTON,
    }}
    screenOptions={() => ({
		  tabBarVisible: Platform.OS !== 'web',
    })}
  >
    <Tab.Screen
      name="Chunks"
      component={ChunkScreen}
      options={{
			  tabBarLabel: 'Chunks',
			  tabBarIcon: ({ color, size }) => (
  <FontAwesome name="tasks" color={color} size={size} />
			  ),
      }}
    />
    <Tab.Screen
      name="Completed"
      component={CompletedChunksScreen}
      options={{
			  tabBarLabel: 'Completed',
			  tabBarIcon: ({ color, size }) => (
  <Octicons name="tasklist" color={color} size={size} />
			  ),
      }}
    />
    <Tab.Screen
      name="Logout"
      component={AuthScreen}
      options={{
			  tabBarLabel: 'Logout',
			  tabBarIcon: ({ color, size }) => (
  <MaterialCommunityIcons name="logout" color={color} size={size} />
			  ),
      }}
    />
  </Tab.Navigator>
);


const StackRoutes = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="InitScreen"
      options={() => ({
			  header: () => null,
      })}
      component={InitScreen}
    />
    <Stack.Screen
      name="Auth"
      options={() => ({
			  header: () => null,
      })}
      component={AuthScreen}
    />
    <Stack.Screen
      options={() => ({
			  header: () => null,
      })}
      name="Tabs"
      component={TabRoutes}
    />
  </Stack.Navigator>
);

const Routes = () => {
  const { user, setUser } = useContext(UserContext);
  const { screen } = useContext(ScreenContext);

  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    if (user) {
      switch (screen) {
        case 0:
          navigate('Chunks');
          // navigate('Tabs', { screen: 'Chunks' });
          break;
        case 1:
          navigate('Completed');
          // navigate('Tabs', { screen: 'Completed' });
          break;
        // case 2:
        //   navigate('Leaderboard');
        //   // navigate('Tabs', { screen: 'Leaderboard' });
        //   break;
        case 2:
          AsyncStorage.removeItem('user').then(() => {
            sendAlert('Logged Out');
            navigate('Auth');
            setUser(null);
          });
          break;
        default:
          navigate('Auth');
          // navigate('Tabs', { screen: 'Auth' });
          break;
      }
    }
  }, [screen]);

  return (
    <>
      {user ? <NavBar /> : null}
      <NavigationContainer ref={navigationRef}>
        <StackRoutes />
      </NavigationContainer>
    </>
  );
};

export default Routes;
