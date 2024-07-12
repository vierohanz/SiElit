import * as React from 'react';
import {View, Image, Text, StatusBar} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import tw from 'twrnc';
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
    <View
      style={tw`flex-1 h-full items-center justify-center bg-[#13A89D] flex-col`}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.2)"
        translucent={true}
      />
      <Image
        source={require('../assets/images/splash.png')}
        style={{
          width: '45%',
          height: '45%',
          resizeMode: 'contain',
        }}
      />
      <Svg height="100" width="300" style={{bottom: '14%'}}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="0.5">
            <Stop offset="0" stopColor="#0C847B" stopOpacity="1" />
            <Stop offset="1" stopColor="#07423E" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <SvgText
          fill="url(#grad)"
          fontSize="32"
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

export default splash;
