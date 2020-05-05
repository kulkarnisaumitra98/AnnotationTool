/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import UserContext from './contexts/UserContext';
import { isMountedRef, navigationRef } from './reusables/functions/NavigatorService';
import AuthScreen from './screens/Auth/AuthScreen';
import ChunkScreen from './screens/Chunk/ChunkScreen';
import NavBar from './screens/Common/Navbar/Navbar';
import CompletedChunksScreen from './screens/CompletedChunks/CompletedChunksScreen';
import LeaderboardScreen from './screens/Leaderboard/LeaderboardScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const TabRoutes = () => (
  <Tab.Navigator screenOptions={() => ({
    tabBarVisible: true,
  })}
  >
    <Tab.Screen name="Chunks" component={ChunkScreen} />
    <Tab.Screen name="Completed" component={CompletedChunksScreen} />
    <Tab.Screen name="LeaderBoard" component={LeaderboardScreen} />
  </Tab.Navigator>
);


const StackRoutes = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Auth"
      options={() => ({
        header: () => null,
      })}
      component={AuthScreen}
    />
    <Stack.Screen name="Tabs" component={TabRoutes} />
  </Stack.Navigator>
);

const Routes = () => {
  const { user } = useContext(UserContext);

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <>
      {user.username ? <NavBar /> : null}
      <NavigationContainer ref={navigationRef}>
        {user.username ? <TabRoutes /> : <StackRoutes />}
      </NavigationContainer>
    </>
  );
};

export default Routes;
