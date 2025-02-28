import React, {useContext, useEffect} from 'react';
import {View, Image, StatusBar, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Svg, {
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import {AuthContext} from '../auth/AuthContext';
import {RootStackParamList} from '../../App'; // Adjust the import path as needed

const Splash = () => {
  const {isAuthenticated} = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Index'); // Navigate to Index if authenticated
      } else {
        navigation.replace('Login'); // Navigate to Login if not authenticated
      }
    }, 3000); // 3 seconds delay for splash screen

    return () => clearTimeout(timer); // Cleanup the timer
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.2)"
        translucent={true}
      />
      <Image
        source={require('../assets/images/versi_2.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: wp('75%'),
    height: wp('75%'),
    resizeMode: 'contain',
  },
});

export default Splash;
