import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';
import ButtonLogin from '../components/ButtonLogin';
import TextInputLogin from '../components/TextInputLogin';
import CheckboxRememberMe from '../components/RememberMe';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {height} = Dimensions.get('window');

const Login: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    navigation.navigate('Index');
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-[#13A89D]`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={tw`bg-[#13A89D] h-full`}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Selamat Datang,</Text>
            <Text style={styles.infoText}>
              Mohon masukkan akun anda terlebih dahulu
            </Text>
          </View>
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Sign In</Text>
            <TextInputLogin
              placeholder="NIS"
              value={username}
              onChangeText={setUsername}
            />
            <TextInputLogin
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.rememberMeContainer}>
              <CheckboxRememberMe
                checked={rememberMe}
                onChange={toggleRememberMe}
              />
            </View>
            <ButtonLogin title="Submit" onPress={handleLogin} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13A89D',
  },
  welcomeContainer: {
    paddingLeft: '5%',
    paddingTop: '30%',
    height: height * 0.3,
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: wp('10%'),
    color: '#C7D021',
  },
  infoText: {
    marginTop: '2%',
    paddingRight: '30%',
    fontSize: wp('5%'),
    fontWeight: '300',
    color: '#ffffff',
  },
  signInContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.735,
    borderBottomLeftRadius: 120,
    borderTopRightRadius: 250,
    padding: 20,
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: wp('8%'),
    color: '#13A89D',
    marginBottom: 30,
  },
  rememberMeContainer: {
    width: '78%',
  },
});

export default Login;
