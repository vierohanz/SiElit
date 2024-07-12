import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Target} from 'react-native-feather';
import HomePage from '../home';
import PresensiPage from '../presensi';
import TargetPage from '../target';
import PerizinanPage from '../perizinan';
import ProfilePage from '../settings/profile';

// Define valid icon names
type IoniconName =
  | 'home'
  | 'newspaper'
  | 'list-outline'
  | 'alarm'
  | 'person'
  | 'apps-sharp';

const Index = () => {
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon: IoniconName = 'home';
    let label = '';

    switch (routeName) {
      case 'home':
        icon = 'home';
        label = 'Home';
        break;
      case 'presensi':
        icon = 'newspaper';
        label = 'Presensi';
        break;
      case 'perizinan':
        icon = 'alarm';
        label = 'Izin';
        break;
      case 'profile':
        icon = 'person';
        label = 'Profile';
        break;
    }

    return (
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={22}
          color={routeName === selectedTab ? '#C7D021' : '#fff'}
        />
        <Text
          style={{
            color: routeName === selectedTab ? '#C7D021' : '#fff',
            fontSize: 10,
          }}>
          {label}
        </Text>
      </View>
    );
  };

  const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: (route: string) => void;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={55}
      circleWidth={50}
      bgColor="#13A89D"
      initialRouteName="home"
      borderTopLeftRight
      renderCircle={({selectedTab, navigate}) => {
        const strokeColor = selectedTab === 'target' ? 'yellow' : '#fff';

        return (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('target')}>
              <Target stroke={strokeColor} fill="none" width={40} height={40} />
            </TouchableOpacity>
          </Animated.View>
        );
      }}
      tabBar={renderTabBar}>
      <CurvedBottomBar.Screen
        name="home"
        position="LEFT"
        component={HomePage}
      />
      <CurvedBottomBar.Screen
        name="presensi"
        position="LEFT"
        component={PresensiPage}
      />
      <CurvedBottomBar.Screen
        name="perizinan"
        position="RIGHT"
        component={PerizinanPage}
      />
      <CurvedBottomBar.Screen
        name="profile"
        position="RIGHT"
        component={ProfilePage}
      />
      <CurvedBottomBar.Screen
        name="target"
        position="CENTER"
        component={TargetPage}
      />
    </CurvedBottomBar.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#13A89D',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
