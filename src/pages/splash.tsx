import * as React from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
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

function splash() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

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
      <Svg height={hp('7%')} width={wp('40%')} style={{}}>
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
          SIELITE
        </SvgText>
      </Svg>
    </View>
  );
}

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
export default splash;
