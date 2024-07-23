import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import login from './src/pages/login';
import splash from './src/pages/splash';
import perizinan from './src/pages/perizinan';
import target from './src/pages/target';
import presensi from './src/pages/presensi';
import home from './src/pages/home';
import profile from './src/pages/settings/profile';
import index from './src/pages/';
import kalender_akademik from './src/pages/settings/kalender_akademik';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Index: undefined;
  Home: undefined;
  Presensi: undefined;
  // Target: undefined;
  Perizinan: undefined;
  Profile: undefined;
  Kalender_Akademik: undefined;
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
          <Stack.Screen
            options={{headerShown: false}}
            name="Kalender_Akademik"
            component={kalender_akademik}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
