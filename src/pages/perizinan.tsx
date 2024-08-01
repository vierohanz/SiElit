import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextInputIzin from '../components/TextInputIzin';
import ButtonIzin from '../components/ButtonIzin';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from './index';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import UploadButton from '../components/uploadbutton';
import CardIzin from '../components/CardIzin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appSettings from '../../Appsettings';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown} from 'react-native-element-dropdown';

const Perizinan = () => {
  const [pengajian, setPengajian] = useState('');
  const [alasan, setAlasan] = useState('');
  const [selectedFile, setSelectedFile] =
    useState<DocumentPickerResponse | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [kelasOptions, setKelasOptions] = useState<any[]>([]);
  const [selectedKelas, setSelectedKelas] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          console.log('No token found');
          setLoading(false);
          return;
        }

        // Fetch permits data
        const response = await axios.get(`${appSettings.api}/permits`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        setData(response.data);

        // Fetch classes data
        const classesResponse = await axios.get(`${appSettings.api}/classes`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        const classItems = classesResponse.data.map((item: any) => ({
          label: item.name, // Adjust this based on your API response
          value: item.id,
        }));
        setKelasOptions(classItems);
        setItems(classItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleIzin = async () => {
    if (pengajian === '' || alasan === '' || !selectedFile || !value) {
      Alert.alert('Error', 'Semua field harus diisi dan file harus dipilih.');
      return;
    }

    const formData = new FormData();
    formData.append('pengajian', pengajian);
    formData.append('alasan', alasan);
    formData.append('kelas', value);
    formData.append('file', {
      uri: selectedFile.uri,
      type: selectedFile.type,
      name: selectedFile.name,
    });

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Alert.alert('Error', 'Token tidak ditemukan. Silakan login ulang.');
        return;
      }

      const response = await axios.post(
        `${appSettings.api}/permits`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Alert.alert('Success', response.data.msg);
      navigation.navigate('perizinan');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response);
        Alert.alert(
          'Error',
          error.response?.data?.message ||
            'Terjadi kesalahan saat mengirim data',
        );
      } else {
        console.error('Error:', error);
        Alert.alert('Error', 'Terjadi kesalahan saat mengirim data');
      }
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picking');
      } else {
        console.log('Error while picking a file', err);
      }
    }
  };
  const [isFocused, setIsFocused] = useState(false);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.backgroundView}></View>
      <View style={styles.overlayView}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Form</Text>
          <Text style={[styles.titleText, styles.subTitleText]}>Perizinan</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Pengajian</Text>
          <Dropdown
            style={[
              styles.dropdown,
              {
                borderColor: isFocused ? '#13A89D' : '#ccc',
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.textItem}
            inputSearchStyle={{}}
            data={items}
            search
            maxHeight={300}
            containerStyle={[styles.itemContainer]}
            itemContainerStyle={[styles.item]}
            itemTextStyle={[styles.teks]}
            labelField="label"
            valueField="value"
            placeholder="Pilih Pengajian"
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={item => {
              setValue(item.value);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Alasan</Text>
          <TextInputIzin
            placeholder="Masukkan alasan"
            value={alasan}
            onChangeText={setAlasan}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Upload File</Text>
          <View style={styles.filePickerContainer}>
            <UploadButton
              title="Pilih File"
              onPress={selectFile}
              color="#000"
            />
            <View style={styles.fileInfo}>
              <Text
                style={[
                  styles.fileName,
                  !selectedFile && styles.placeholderText,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {selectedFile ? selectedFile.name : 'No file selected'}
              </Text>
            </View>
          </View>
        </View>
        <ButtonIzin title="Submit" onPress={handleIzin} />
      </View>
      <View style={styles.riwayatContainer}>
        <Text style={styles.riwayatText}>Riwayat</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#13A89D" />
        ) : (
          data.map((item, index) => (
            <CardIzin
              key={item.id}
              item={item}
              isLast={index === data.length - 1}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  teks: {
    color: '#000',
  },
  itemContainer: {
    padding: 5,
    borderRadius: 20,
  },
  item: {
    marginVertical: hp('1%'),
    marginHorizontal: 5,
    height: hp('7.5%'),
    borderRadius: 20,
  },
  itemText: {
    fontSize: 16,
  },
  dropdown: {
    width: '100%',
    paddingLeft: wp('5%'),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: hp('6.8%'),
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    color: '#000',
    elevation: 1,
  },
  textItem: {
    flex: 1,
    fontSize: wp('4.3%'),
    color: '#000000',
  },
  placeholderStyle: {
    fontSize: wp('4.3%'),
    color: '#000000',
  },

  scrollView: {
    backgroundColor: '#fff',
    paddingBottom: -1000,
  },
  backgroundView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#13A89D',
    height: hp('35%'),
  },
  overlayView: {
    marginTop: hp('-27.5%'),
    marginHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderRadius: 15,
    backgroundColor: '#fff',
    borderColor: '#E3E3E3',
    borderWidth: 1,
    elevation: 5,
    paddingBottom: hp('4%'),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('3%'),
  },
  titleText: {
    color: '#000',
    fontSize: wp('6%'),
    fontWeight: '900',
  },
  subTitleText: {
    color: '#13A89D',
    marginLeft: wp('1.5%'),
  },
  inputContainer: {
    marginBottom: hp('1%'),
    paddingHorizontal: wp('7%'),
  },
  labelText: {
    marginBottom: hp('1%'),
    color: '#333333',
    fontSize: wp('4%'),
    fontWeight: '700',
  },
  filePickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileInfo: {
    marginLeft: wp('3%'),
    flex: 1,
  },
  fileName: {
    color: '#333',
    fontSize: wp('4%'),
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  riwayatContainer: {
    marginTop: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  riwayatText: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#333',
    marginBottom: hp('1%'),
  },
});

const pickerSelectStyles = StyleSheet.create({
  container: {
    marginTop: wp('0.5%'),
    height: hp('5.8%'),
    width: '100%',
    borderColor: '#ccc',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    elevation: 5,
    borderRadius: 5,
    marginBottom: hp('1%'),
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000000',
    fontWeight: '400',
    fontSize: wp('4%'),
    paddingLeft: wp('5%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2, // Adjust this value as needed
  },
  text: {
    fontSize: wp('4%'),
  },
});

export default Perizinan;
