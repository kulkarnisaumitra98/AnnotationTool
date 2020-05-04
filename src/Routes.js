import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import UserContext from './contexts/UserContext';
import AuthScreen from './screens/Auth/AuthScreen';
import CompletedChunksScreen from './screens/CompletedChunks/CompletedChunksScreen';
import LeaderboardScreen from './screens/Leaderboard/LeaderboardScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabRoutes = () => (
  <Tab.Navigator>
    {/* <Tab.Screen name="Chunks" component={ChunkScreen} /> */}
    <Tab.Screen name="Completed" component={CompletedChunksScreen} />
    <Tab.Screen name="LeaderBoard" component={LeaderboardScreen} />
  </Tab.Navigator>
);


const StackRoutes = () => (
  <Stack.Navigator>
    <Stack.Screen name="Auth" component={AuthScreen} />
    <Stack.Screen name="Tabs" component={TabRoutes} />
  </Stack.Navigator>
);

const Routes = () => {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      {user.username ? <TabRoutes /> : <StackRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
