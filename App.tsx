import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/pages/login';
import Splash from './src/pages/splash';
import Perizinan from './src/pages/perizinan';
import Target from './src/pages/target';
import Presensi from './src/pages/presensi';
import Home from './src/pages/home';
import Profile from './src/pages/settings/profile';
import Index from './src/pages/';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Index: undefined;
  Home: undefined;
  Presensi: undefined;
  // Target: undefined;
  Perizinan: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
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
          {/* <Stack.Screen
            options={{headerShown: false}}
            name="Target"
            component={Target}
          /> */}
          <Stack.Screen
            options={{headerShown: false}}
            name="Index"
            component={Index}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
