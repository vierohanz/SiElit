import React, {useState, useRef, useEffect} from 'react';
import TextInputIzin from './TextInputIzin';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import axios from 'axios';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useWindowDimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ButtonIzin from './ButtonIzin';
import appSettings from '../../Appsettings';

interface EditProfileBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handlePresentModalPress: () => void;
  onUpdate: () => void;
}

const EditProfileBottomSheet: React.FC<EditProfileBottomSheetProps> = ({
  bottomSheetModalRef,
  onUpdate,
  handlePresentModalPress,
}) => {
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [password, setPassword] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordNewConfirm, setPasswordNewConfirm] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (text: string) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    setTelepon(numericText);
  };
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      if (storedToken) {
        setToken(storedToken);
        fetchUserData(storedToken);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No token found. Please log in again.',
        });
      }
    };

    fetchToken();
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get(`${appSettings.api}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API response:', response.data);
      const userData = response.data[0];
      const {telephone_number, residence_in_semarang} = userData;
      setTelepon(telephone_number);
      setAlamat(residence_in_semarang);

      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch user data',
      });
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No token found. Please log in again.',
      });
      return;
    }

    if (telepon === '' || alamat === '' || password === '') {
      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2: 'Telepon, alamat, and old password are required',
      });
      return;
    }

    if (passwordNew && passwordNew !== passwordNewConfirm) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'New password and confirmation do not match',
        visibilityTime: 4000,
      });
      return;
    }

    try {
      await axios.put(
        `${appSettings.api}/users`,
        {
          telephone_number: telepon,
          residence_in_semarang: alamat,
          password,
          passwordNew: passwordNew || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Update berhasil',
      });
      setPassword('');
      setPasswordNew('');
      setPasswordNewConfirm('');
      handlePresentModalPress();
      onUpdate();
      bottomSheetModalRef.current?.close();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            await AsyncStorage.removeItem('accessToken');
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Session expired. Please log in again.',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Update failed',
              text2: 'Telepon, alamat, and old password are required',
              visibilityTime: 3000,
            });
          }
        } else if (error.request) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No response from server. Please try again later.',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: `Error in request: ${error.message}`,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An unknown error occurred',
        });
      }
    }
  };

  if (loading) {
    return <Text>Loading...</Text>; // Or a loading spinner
  }

  return (
    <View style={{flex: 1}}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['25%', '50%', '80%']}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.7}
            appearsOnIndex={1}
            disappearsOnIndex={-1}
          />
        )}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={{paddingBottom: hp('15%')}}>
            <View style={styles.header}>
              <Text style={[styles.headerText, {fontSize: wp('6.5%')}]}>
                Edit
              </Text>
              <Text style={[styles.headerTextColored, {fontSize: wp('6.5%')}]}>
                {' '}
                Data
              </Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.textForm}>Telepon</Text>

              <TextInputIzin
                placeholder="ex : 089065432123"
                value={telepon}
                onChangeText={handleTextChange}
                keyboardType="numeric"
              />
              <Text style={styles.textForm}>Tempat Tinggal</Text>
              <TextInputIzin
                placeholder="ex : PPM"
                value={alamat}
                onChangeText={setAlamat}
              />
              <Text style={styles.textForm}>Password Lama</Text>
              <TextInputIzin
                placeholder="masukan password lama"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Text style={styles.textForm}>Password Baru (opsional)</Text>
              <TextInputIzin
                placeholder="masukan password baru"
                value={passwordNew}
                onChangeText={setPasswordNew}
                secureTextEntry
              />
              <Text style={styles.textForm}>
                Konfirmasi Password Baru (opsional)
              </Text>
              <TextInputIzin
                placeholder="konfirmasi password baru"
                value={passwordNewConfirm}
                onChangeText={setPasswordNewConfirm}
                secureTextEntry
              />
              <ButtonIzin title="submit" onPress={handleSubmit} />
            </View>
          </View>
        </ScrollView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
  },
  headerText: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  headerTextColored: {
    color: '#13A89D',
    fontFamily: 'Poppins-Bold',
  },
  form: {
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('7%'),
  },
  textForm: {
    marginTop: hp('0.5%'),
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('3.5%'),
    color: '#000000',
  },
  contentText: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  rowContainer: {
    borderLeftColor: '#13A89D',
    borderLeftWidth: 5,
    alignItems: 'flex-start',
  },
  rowTouchable: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    justifyContent: 'space-between',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 15,
  },
});

export default EditProfileBottomSheet;
