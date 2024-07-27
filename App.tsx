import React, {useEffect, useState, useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/pages/login';
import Splash from './src/pages/splash';
import Index from './src/pages/index';
import KalenderAkademik from './src/pages/settings/kalender_akademik';
import {AuthContext, AuthProvider} from './src/auth/AuthContext';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Index: undefined;
  Kalender_Akademik: undefined;
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {isAuthenticated, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#13A89D"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [{translateX: -25}, {translateY: -25}],
        }}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Index' : 'Splash'}>
        <Stack.Screen
          options={{headerShown: false}}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Index"
          component={Index}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Kalender_Akademik"
          component={KalenderAkademik}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
