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
import Toast from 'react-native-toast-message';
import {RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const Perizinan = () => {
  const [class_id, setclass_id] = useState<any>('');
  const [description, setdescription] = useState('');
  const [img_file, setimg_file] = useState<DocumentPickerResponse | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [kelasOptions, setKelasOptions] = useState<any[]>([]);
  const [selectedKelas, setSelectedKelas] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => resetForm();
    }, []),
  );

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Token tidak ditemukan. Tolong login lagi.',
        });
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
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  const resetForm = () => {
    setclass_id('');
    setdescription('');
    setimg_file(null);
    setValue(null);
  };

  const handleIzin = async () => {
    if (class_id === '' || description === '' || !img_file) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Tolong inputkan semua form',
      });
      return;
    }

    const formData = new FormData();
    formData.append('class_id', class_id);
    formData.append('description', description);
    formData.append('img_file', {
      uri: img_file.uri,
      type: img_file.type,
      name: img_file.name,
    });

    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Token tidak ditemukan. Tolong login lagi.',
        });
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
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: 'Berhasil membuat perizinan',
      });
      resetForm();
      handleRefresh();
      // navigation.navigate('perizinan');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Anda sudah izin sebelumnya',
        });
      } else {
        console.error('Error:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Terjadi kesalahan saat mengirim data.',
        });
      }
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setimg_file(res);
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
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#13A89D']}
        />
      }>
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
              {borderColor: isFocused ? '#13A89D' : '#ccc'},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.textItem}
            data={kelasOptions}
            search
            maxHeight={300}
            containerStyle={[styles.itemContainer]}
            itemContainerStyle={[styles.item]}
            itemTextStyle={[styles.teks]}
            labelField="label"
            valueField="value"
            placeholder="Pilih Pengajian"
            searchPlaceholder="Search..."
            inputSearchStyle={[styles.teks]}
            value={class_id}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={item => {
              setclass_id(item.value);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Alasan</Text>
          <TextInputIzin
            placeholder="Masukkan alasan"
            value={description}
            onChangeText={setdescription}
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
                style={[styles.fileName, !img_file && styles.placeholderText]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {img_file ? img_file.name : 'No file selected'}
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
