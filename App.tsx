import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import login from './src/pages/login';
import splash from './src/pages/splash';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
