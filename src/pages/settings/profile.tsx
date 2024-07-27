import React, {useContext, useRef, useState, useEffect} from 'react';
import {NavigationProp} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import {AuthContext} from '../../auth/AuthContext';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import KafarohBottomSheet from '../../components/KafarohBottomSheet';
import EditProfileBottomSheet from '../../components/EditProfileBottomSheet';

const datadiri: ProfilePros[] = [
  // Data Diri
  {
    id: '1',
    icon: 'mail-outline',
    color: '#C7D02190',
    text: 'johndoe@gmail.com',
  },
  {
    id: '2',
    icon: 'call-outline',
    color: '#13A89D90',
    text: '+6289504469254',
  },
  {
    id: '3',
    icon: 'locate',
    color: '#94008E80',
    text: 'Ds. Manokwari Rt 01 / Rw 03',
  },
];

const datalainnya: ProfilePros[] = [
  // Data untuk Diri
  {
    id: '1',
    icon: 'create-outline',
    color: '#0047FF60',
    text: 'Edit Data',
  },
  {
    id: '2',
    icon: 'ribbon-outline',
    color: '#45E62B80',
    text: 'IPK',
  },
  {
    id: '3',
    icon: 'calendar-number-outline',
    color: '#FF00F560',
    text: 'Kalender Akademik',
  },
  {
    id: '4',
    icon: 'log-out-outline',
    color: '#FFA6A6',
    text: 'Sign Out',
  },
];
type ProfilePros = {
  id: string;
  icon: string;
  color: string;
  text: string;
};

// Data ini digunakan untuk Kafaroh
type DataItem = {
  title: string;
  items: string[];
};
type Data = Record<string, DataItem[]>;
const initialData: Data = {
  BNC: [
    {
      title: 'Piket dapur astra',
      items: ['Sunlight 3 ml - 3 buah', 'Spon - 4 buah'],
    },
    {title: 'Piket jumber', items: ['Sapu - 2 buah', 'Pel - 3 buah']},
  ],
  Pendidikan: [
    {
      title: 'Tidak izin mengaji',
      items: ['3 kali - 5 point', '5 kali - 10 point'],
    },
    {
      title: 'Datang pengajian terlambat',
      items: ['2 kali - 3 point', '4 kali - 6 point'],
    },
  ],
  DMC: [
    {
      title: 'Sholat Malam',
      items: ['2 kali - 3 point', '4 kali - 6 point'],
    },
  ],
};

const Profile = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [data, setData] = useState<Data>(initialData);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef_editProfile = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        setUsername(storedUsername);
      } catch (error) {
        console.error('Failed to load username from AsyncStorage:', error);
      }
    };

    loadUsername();
  }, []);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleSignOut = async () => {
    try {
      // Hapus token dari Keychain
      await Keychain.resetGenericPassword();

      // Navigasi ke layar login
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const handlePresentModalPress_editProfile = () => {
    bottomSheetModalRef_editProfile.current?.present();
  };

  const renderItemDataDiri: ListRenderItem<ProfilePros> = ({item}) => (
    <View style={styles.listItemContainer}>
      <View style={[styles.listItemIcon, {backgroundColor: item.color}]}>
        <Ionicons name={item.icon} size={wp('7.8%')} color={'#FFFFFF'} />
      </View>
      <Text style={styles.listItemText}>{item.text}</Text>
    </View>
  );

  const renderItemLainnya: ListRenderItem<ProfilePros> = ({item}) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => {
        if (item.text === 'Kalender Akademik') {
          navigation.navigate('Kalender_Akademik');
        } else if (item.text === 'Sign Out') {
          handleSignOut();
        } else if (item.text === 'IPK') {
          navigation.navigate('IPK');
        } else if (item.text === 'Edit Data') {
          bottomSheetModalRef_editProfile.current?.present();
        }
      }}>
      <View style={[styles.listItemIcon, {backgroundColor: item.color}]}>
        <Ionicons name={item.icon} size={wp('7.8%')} color={'#FFFFFF'} />
      </View>
      <Text
        style={[
          styles.listItemText,
          item.text === 'Sign Out' && styles.boldText,
        ]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Hitung jumlah total item dari semua kategori dalam data
    const total = Object.keys(data).reduce((acc, key) => {
      return (
        acc + data[key].reduce((subAcc, item) => subAcc + item.items.length, 0)
      );
    }, 0);

    // Set total item
    setTotalItems(total);
  }, [data]);
  return (
    <BottomSheetModalProvider>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackground}
            source={require('../../assets/images/bg_profile2.jpg')}
            resizeMode="cover">
            <View style={styles.profileImageContainer}>
              <ImageBackground
                source={require('../../assets/images/hannan.jpg')}
                resizeMode="cover"
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.profileName}>{username || 'Guest'}</Text>
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileInfoText}>Santri</Text>
              <Text style={styles.profileInfoHighlight}> | PPM BKI</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statValueContainer}>
                <Text style={styles.statPlus}>+</Text>
                <Text style={styles.statNumber}>70</Text>
                <Text style={styles.statPercentage}>%</Text>
              </View>
              <Text style={styles.statLabel}>Ketercapaian</Text>
            </View>
            <TouchableOpacity
              style={styles.statItem2}
              onPress={handlePresentModalPress}>
              <View style={styles.kafarohValueContainer}>
                <Text style={styles.kafarohValue}>{totalItems}</Text>
              </View>
              <Text style={styles.statLabel}>Kafaroh</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Data Diri</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={datadiri}
              renderItem={renderItemDataDiri}
              keyExtractor={item => item.id}
            />
          </View>
          <Text style={styles.dataLabel}>Lainnya</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={datalainnya}
              renderItem={renderItemLainnya}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
      <KafarohBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        handlePresentModalPress={handlePresentModalPress}
        data={data}
      />
      <EditProfileBottomSheet
        bottomSheetModalRef={bottomSheetModalRef_editProfile}
        handlePresentModalPress={handlePresentModalPress_editProfile}
        data={data}
      />
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: hp('45%'),
    backgroundColor: '#000',
  },
  headerBackground: {
    height: hp('100%'),
    width: wp('100%'),
    display: 'flex',
    marginVertical: -hp('50%'),
    paddingTop: hp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    height: hp('14%'),
    width: hp('14%'),
    backgroundColor: '#000',
    borderRadius: 70,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileImage: {
    height: '100%',
  },
  profileName: {
    marginTop: hp('1%'),
    fontSize: wp('5.3%'),
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  profileInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: hp('-1%'),
  },
  profileInfoText: {
    fontSize: wp('3.3%'),
    color: '#fff',
  },
  profileInfoHighlight: {
    fontSize: wp('3.3%'),
    color: '#C7D021',
    fontWeight: '600',
  },
  mainContainer: {
    height: hp('6%'),
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
  },
  statsContainer: {
    height: hp('8%'),
    width: wp('80%'),
    backgroundColor: '#fff',
    borderRadius: 40,
    marginTop: hp('-4%'),
    elevation: 5,
    paddingVertical: hp('1%'),
    display: 'flex',
    flexDirection: 'row',
  },
  statItem: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1.5,
    borderRightColor: '#13A89D',
  },
  statItem2: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1.5,
    borderLeftColor: '#13A89D',
  },
  statValueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 2,
  },
  statPlus: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#13A89D',
    marginBottom: hp('0.3%'),
  },
  statNumber: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: '#13A89D',
  },
  statPercentage: {
    fontSize: wp('6%'),
    fontWeight: '400',
    color: '#13A89D',
    marginBottom: hp('0.2%'),
  },
  statLabel: {
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  kafarohValueContainer: {
    display: 'flex',
    backgroundColor: '#D2EEEC',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 5,
    marginBottom: hp('0.4%'),
  },
  kafarohValue: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#13A89D',
  },
  dataContainer: {
    height: hp('70%'), // Hati-hati dengan Ini
    width: wp('100%'),
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: hp('10%'),
  },
  dataLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('4%'),
    color: '#B8B8B8',
    // fontWeight: 'bold',
  },
  listContainer: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#fff',
    marginTop: hp('1%'),
    borderRadius: 15,
    elevation: 3,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    marginBottom: hp('1%'),
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  listItemIcon: {
    height: wp('10.8%'),
    width: wp('10.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  listItemText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Regular',
    paddingLeft: 17,
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#FE0000',
  },
  bottomSheet: {},
});

export default Profile;
