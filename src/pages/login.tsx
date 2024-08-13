import React, {useState, useContext} from 'react';
import {CommonActions} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar,
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
  const [loading, setLoading] = useState(false);

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
        text: 'Data tidak boleh kosong.',
        duration: 3000,
        backgroundColor: '#1E1E1E',
        textColor: 'white',
      });
      if (!loginData.password)
        setLoginData(prev => ({...prev, passwordErr: 'tidak boleh kosong'}));
      Snackbar.show({
        text: 'Data tidak boleh kosong.',
        duration: 3000,
        backgroundColor: '#1E1E1E',
        textColor: 'white',
      });
    } else {
      console.log('Login data:', {
        name: loginData.name,
        password: loginData.password,
      });

      setLoading(true); // Mulai loading spinner

      axios
        .post(`${appSettings.api}/auth/login`, {
          name: loginData.name,
          password: loginData.password,
        })
        .then(async (res: any) => {
          console.log('Access Token:');
          if (res.data.accessToken) {
            await login(res.data.accessToken);
            await AsyncStorage.setItem('accessToken', res.data.accessToken);
            await AsyncStorage.setItem('username', loginData.name);

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Index'}], // Change 'Index' to 'Home' if that's the name of your home screen
              }),
            );
          } else {
            Snackbar.show({
              text: 'Username atau password anda salah',
              duration: 3000,
              backgroundColor: '#1E1E1E',
              textColor: 'white',
            });
          }
          setLoading(false); // Selesai loading spinner
        })
        .catch(async (err: any) => {
          console.log('Error:', err);
          if (err.response && err.response.status === 401) {
            await Keychain.resetGenericPassword();
          } else {
            Snackbar.show({
              text: err.message,
              duration: 3000,
              backgroundColor: 'white',
            });
          }
          setLoading(false);
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
          <StatusBar
            barStyle="light-content"
            backgroundColor="rgba(0, 0, 0, 0.2)"
            translucent={true}
          />
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
            <ButtonLogin
              title="Submit"
              onPress={handleLogin}
              disabled={loading}
            />
            {loading && <ActivityIndicator size="small" color="#13A89D" />}
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
    height: height * 0.25,
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
    height: hp('78%'),
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
