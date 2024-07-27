import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import ButtonLogin from '../components/ButtonLogin';
import TextInputLogin from '../components/TextInputLogin';
import CheckboxRememberMe from '../components/RememberMe';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {AuthContext} from '../auth/AuthContext';
import appSettings from '../../Appsettings';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {login} = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    name: '',
    nameErr: '',
    password: '',
    passwordErr: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!loginData.name || !loginData.password) {
      if (!loginData.name)
        setLoginData(prev => ({...prev, nameErr: 'tidak boleh kosong'}));
      Snackbar.show({
        text: 'Username tidak boleh kosong.',
        duration: 3000,
        backgroundColor: '#1E1E1E',
        textColor: 'white',
      });
      if (!loginData.password)
        setLoginData(prev => ({...prev, passwordErr: 'tidak boleh kosong'}));
      Snackbar.show({
        text: 'Password tidak boleh kosong.',
        duration: 3000,
        backgroundColor: '#1E1E1E',
        textColor: 'white',
      });
    } else {
      console.log('Login data:', {
        name: loginData.name,
        password: loginData.password,
      });

      axios
        .post(`${appSettings.api}/auth/login`, {
          name: loginData.name,
          password: loginData.password,
        })
        .then(async (res: any) => {
          console.log('Access Token:', res.data.accessToken);
          if (res.data.accessToken) {
            await login(res.data.accessToken);
            await AsyncStorage.setItem('accessToken', res.data.accessToken); // Ensure the key is 'accessToken'
            await AsyncStorage.setItem('username', loginData.name);

            navigation.navigate('Index');
          } else {
            Snackbar.show({
              text: res.data.msg,
              duration: 3000,
              backgroundColor: '#1E1E1E',
              textColor: 'white',
            });
          }
        })
        .catch(async (err: any) => {
          if (err.response && err.response.status === 401) {
            await Keychain.resetGenericPassword();
          } else {
            Snackbar.show({
              text: err.message,
              duration: 3000,
              backgroundColor: 'white',
            });
          }
        });
    }
  };

  const handleChange = (value: string, name: string) => {
    setLoginData(prev => ({...prev, [name]: value, [`${name}Err`]: ''}));
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS ? 10 : 0}>
      <ScrollView keyboardShouldPersistTaps="handled">
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
              placeholder="Username"
              value={loginData.name}
              onChangeText={value => handleChange(value, 'name')}
            />
            <TextInputLogin
              placeholder="Password"
              value={loginData.password}
              onChangeText={value => handleChange(value, 'password')}
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
    paddingTop: '20%',
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
