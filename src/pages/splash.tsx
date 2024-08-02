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
        source={require('../assets/images/splash.png')}
        style={styles.logo}
      />
      <Svg height={hp('7%')} width={wp('40%')}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="0.5">
            <Stop offset="0" stopColor="#0C847B" stopOpacity="1" />
            <Stop offset="1" stopColor="#07423E" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <SvgText
          fill="url(#grad)"
          fontSize={wp('8%')}
          fontWeight="900"
          x="50%"
          y="50%"
          textAnchor="middle">
          SIELIT
        </SvgText>
      </Svg>
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
    backgroundColor: '#13A89D',
  },
  logo: {
    width: wp('45%'),
    height: wp('45%'),
    resizeMode: 'contain',
  },
});

export default Splash;
