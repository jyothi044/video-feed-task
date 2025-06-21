import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppContext';
import LoginScreen from './src/screens/LoginScreen';
import VideoFeedScreen from './src/screens/VideoFeedScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { useApp } from './src/context/AppContext';
import './global.css';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useApp();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="VideoFeed" component={VideoFeedScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AppProvider>
      <StatusBar style="light" backgroundColor="#000000" />
      <AppNavigator />
    </AppProvider>
  );
};

export default App;