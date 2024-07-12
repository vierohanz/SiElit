import React from 'react';
import {
  View,
  Text,
  Alert,
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

// Untuk mengambil height layar
const {height} = Dimensions.get('window');

const Login: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Gunakan useNavigation di dalam komponen fungsional Login

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleLogin = () => {
    // Contoh validasi sederhana

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
        <View style={tw`bg-[#13A89D] h-full flex-1 flex-col`}>
          <View
            style={{
              paddingLeft: '5%',
              paddingTop: '30%',
              height: height * 0.3,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 36, color: '#C7D021'}}>
              Selamat Datang,
            </Text>
            <Text
              style={{
                marginTop: '2%',
                paddingRight: '30%',
                fontSize: 16,
                fontWeight: '300',
                color: '#ffffff',
              }}>
              Mohon masukkan akun anda terlebih dahulu
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
              height: height * 0.73,
              borderBottomLeftRadius: 120,
              borderTopRightRadius: 250,
              padding: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 26,
                color: '#13A89D',
                marginBottom: 30,
              }}>
              Sign In
            </Text>
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
            <View style={{width: '78%'}}>
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

export default Login;
