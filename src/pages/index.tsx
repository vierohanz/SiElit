import React, {useState, useEffect} from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Target} from 'react-native-feather';
import HomePage from './home';
import PresensiPage from './presensi';
import TargetPage from './target';
import PerizinanPage from './perizinan';
import ProfilePage from './settings/profile';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ProfileProvider} from '../context/profileContext';

export type RootStackParamList = {
  home: undefined;
  presensi: undefined;
  perizinan: undefined;
  profile: undefined;
  target: undefined;
};

// Define valid icon names
type IoniconName =
  | 'home'
  | 'newspaper'
  | 'list-outline'
  | 'alarm'
  | 'person'
  | 'apps-sharp';

const {height} = Dimensions.get('window');
// const getBottomMargin = () => {
//   if (height < 770) {
//     return 30;
//   } else {
//     return 30;
//   }
// };
const getHeight = () => {
  if (height < 770) {
    return 55;
  } else {
    return 70;
  }
};

const Index = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
      <ProfileProvider>
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon}
            size={wp('5.8%')}
            color={routeName === selectedTab ? '#C7D021' : '#fff'}
          />
          <Text
            style={{
              color: routeName === selectedTab ? '#C7D021' : '#fff',
              fontSize: wp('3%'),
            }}>
            {label}
          </Text>
        </View>
      </ProfileProvider>
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
    <ProfileProvider>
      <CurvedBottomBar.Navigator
        type="DOWN"
        style={[
          styles.bottomBar,
          {display: isKeyboardVisible ? 'none' : 'flex'},
        ]}
        shadowStyle={styles.shadow}
        height={60}
        circleWidth={57}
        bgColor="#13A89D"
        initialRouteName="home"
        borderTopLeftRight
        renderCircle={({selectedTab, navigate}) => {
          const strokeColor = selectedTab === 'target' ? 'yellow' : '#B3B3B3';

          return (
            <Animated.View style={styles.btnCircleUp}>
              <TouchableOpacity
                style={styles.button}
                // onPress={() => navigate('target')}
              >
                <Target
                  stroke={strokeColor}
                  fill="none"
                  width={40}
                  height={40}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        }}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="home"
          position="LEFT"
          component={HomePage}
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="presensi"
          position="LEFT"
          component={PresensiPage}
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="perizinan"
          position="RIGHT"
          component={PerizinanPage}
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="profile"
          position="RIGHT"
          component={ProfilePage}
        />
        <CurvedBottomBar.Screen
          options={{headerShown: false}}
          name="target"
          position="CENTER"
          component={TargetPage}
        />
      </CurvedBottomBar.Navigator>
    </ProfileProvider>
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
    shadowRadius: 2,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  btnCircleUp: {
    width: wp('17%'),
    height: wp('17%'),
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#13A89D',
    backgroundColor: '#A9A9A9',
    color: '#A9A9A9',
    bottom: hp('4%'),
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
