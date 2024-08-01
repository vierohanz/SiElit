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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import login from './src/pages/login';
import splash from './src/pages/splash';
import perizinan from './src/pages/perizinan';
import target from './src/pages/target';
import presensi from './src/pages/presensi';
import index from './src/pages/';
import kalender_akademik from './src/pages/settings/kalender_akademik';
import ipk from './src/pages/settings/ipk';
import Toast from 'react-native-toast-message';
import {ProfileProvider} from './profileContext';

const Stack = createStackNavigator();
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Index: undefined;
  Kalender_Akademik: undefined;
  IPK: undefined;
  FetchUser: undefined;
  Gas: undefined;
  ref: undefined;
};

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
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? 'Index' : 'Splash'}>
          <Stack.Screen
            options={{headerShown: false}}
            name="Splash"
            component={splash}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Target"
            component={target}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Index"
            component={index}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Kalender_Akademik"
            component={kalender_akademik}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="IPK"
            component={ipk}
          />
        </Stack.Navigator>
        <Toast ref={ref => Toast.setRef(ref as any)} />
      </NavigationContainer>
    </ProfileProvider>
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
