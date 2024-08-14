import React, {useEffect, useState, useContext} from 'react';
import {ActivityIndicator, PermissionsAndroid, Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer, LinkingOptions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext, AuthProvider} from './src/auth/AuthContext';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import Toast from 'react-native-toast-message';

// Import your components
import login from './src/pages/login';
import splash from './src/pages/splash';
import target from './src/pages/target';
import index from './src/pages/index';
import kalender_akademik from './src/pages/settings/kalender_akademik';
import ipk from './src/pages/settings/ipk';

const Stack = createStackNavigator();
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Index: undefined;
  Kalender_Akademik: undefined;
  IPK: undefined;
};

// Constants for navigation IDs
const NAVIGATION_IDS = ['Index', 'Kalender_Akademik', 'IPK'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId);
    return null;
  }
  return `sielit://${navigationId.toLowerCase()}`;
}

// Configure deep linking
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['sielit://'],
  config: {
    screens: {
      Index: 'index',
      Kalender_Akademik: 'kalender_akademik',
      IPK: 'ipk',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url) {
      return url;
    }
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    return deeplinkURL;
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    // Listen to background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Listen to foreground messages
    const foregroundSubscription = messaging().onMessage(
      async remoteMessage => {
        console.log('A new FCM message arrived!', remoteMessage);
      },
    );

    // Handle notifications when app is opened from the background
    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      remoteMessage => {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (url) {
          listener(url);
        }
      },
    );

    return () => {
      linkingSubscription.remove();
      unsubscribeNotification();
      foregroundSubscription();
    };
  },
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
    <AlertNotificationRoot>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName={'Splash'}>
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
    </AlertNotificationRoot>
  );
};

const App = () => {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        const token = await messaging().getToken();
        console.log('FCM token:', token);
      }
    };

    requestUserPermission();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
