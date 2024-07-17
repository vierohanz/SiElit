import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextInputIzin from '../components/TextInputIzin';
import ButtonIzin from '../components/ButtonIzin';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from './settings/index';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import UploadButton from '../components/uploadbutton';
import CardIzin from '../components/CardIzin';

const data = [
  {
    id: '1',
    day: 'Sen',
    time: '18:30',
    title: 'Pengajian Desa',
    class: 'Lambatan',
    status: 'Disetujui',
    name: 'Raishannan',
    date: '2024-07-21',
    description: 'Sedang sakit diare dan juga pilek mohon izin',
    image: '../assets/images/hannan.jpg',
  },
];
const Perizinan = () => {
  const [pengajian, setPengajian] = useState('');
  const [alasan, setAlasan] = useState('');
  const [selectedFile, setSelectedFile] =
    useState<DocumentPickerResponse | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleIzin = () => {
    if (pengajian === '' || alasan === '' || !selectedFile) {
      Alert.alert('Error', 'Semua field harus diisi dan file harus dipilih.');
      return;
    }

    const formData = new FormData();
    formData.append('pengajian', pengajian);
    formData.append('alasan', alasan);
    formData.append('file', {
      uri: selectedFile.uri,
      type: selectedFile.type,
      name: selectedFile.name,
    });

    fetch('URL_ENDPOINT_ANDA', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        Alert.alert('Success', 'Data berhasil dikirim');
        navigation.navigate('perizinan');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Terjadi kesalahan saat mengirim data');
      });
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
          <TextInputIzin
            placeholder="jenis pengajian"
            value={pengajian}
            onChangeText={setPengajian}
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
        {data.map((item, index) => (
          <CardIzin
            key={item.id}
            item={item}
            isLast={index === data.length - 1}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginLeft: wp('2%'),
    maxWidth: wp('60%'),
    flexShrink: 1,
  },
  fileName: {
    fontSize: wp('4%'),
    color: '#333',
  },
  placeholderText: {
    color: '#888',
  },
  riwayatContainer: {
    marginTop: hp('2%'),
    paddingHorizontal: wp('5%'),
    fontSize: wp('5%'),
    fontWeight: '800',
    color: '#000',
    marginBottom: 10,
  },
  riwayatText: {
    color: '#000',
    fontSize: wp('5%'),
    marginBottom: 10,
    fontWeight: '700',
  },
});

export default Perizinan;
