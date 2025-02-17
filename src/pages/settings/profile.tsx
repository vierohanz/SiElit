import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';
import {StatusBar} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
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
} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import KafarohBottomSheet from '../../components/KafarohBottomSheet';
import EditProfileBottomSheet from '../../components/EditProfileBottomSheet';
import appSettings from '../../../Appsettings';
import BottomSheetAvatar from '../../components/BottomSheetAvatar';
import {useProfile} from '../../context/profileContext';
import {RefreshControl} from 'react-native';

type DataDiri = {
  id: number;
  name: string;
  card_id: string | null;
  password: string;
  birth_date: string;
  grade: string;
  telephone_number: string | null;
  role: number;
  class_type: number;
  gender: number;
  nis: string;
  is_active: number;
  inactive_reason: string | null;
  origin: string;
  residence_in_semarang: string;
  role_name: string;
  class_name: string;
};

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
  const {selectedAvatar, setSelectedAvatar} = useProfile();
  const [UsersData, setUsersData] = useState<DataDiri[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [data, setData] = useState<Data>(initialData);
  const [loading, setLoading] = useState(true);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalProfile = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef_editProfile = useRef<BottomSheetModal>(null);
  const [isAvatarPickerVisible, setAvatarPickerVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
  const toggleAvatarPicker = () => {
    console.log('Avatar picker toggled');
    setAvatarPickerVisible(!isAvatarPickerVisible);
    bottomSheetModalProfile.current?.present();
  };
  const handleSelectAvatar = async (avatar: string) => {
    console.log('Selected avatar:', avatar); // Debugging: Menampilkan avatar yang dipilih di console
    setSelectedAvatar(avatar);
    await AsyncStorage.setItem('selectedAvatar', avatar);
    setAvatarPickerVisible(false);
    bottomSheetModalProfile.current?.close();
  };
  useEffect(() => {
    const loadAvatar = async () => {
      const storedAvatar = await AsyncStorage.getItem('selectedAvatar');
      if (storedAvatar) {
        setSelectedAvatar(JSON.parse(storedAvatar));
      }
    };

    loadAvatar();
  }, []);
  const handlePresentProfile = () => {
    bottomSheetModalProfile.current?.present();
  };

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleSignOut = async () => {
    // Mengatur status bar sebelum menampilkan dialog
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.5)', true);
    StatusBar.setTranslucent(true);

    // Menampilkan dialog konfirmasi
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Confirm Sign Out',
      textBody: 'Are you sure you want to sign out?',
      button: 'Yes',
      onPressButton: async () => {
        try {
          console.log('Yes button pressed');
          Dialog.hide();
          await Keychain.resetGenericPassword();
          console.log('Token removed from Keychain');

          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
          console.log('Navigated to Login screen');
        } catch (error) {
          console.error('Error during sign out:', error);
        } finally {
          StatusBar.setBarStyle('light-content', true);
          StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)', true);
          StatusBar.setTranslucent(true);
        }
      },
    });
  };

  const handlePresentModalPress_editProfile = () => {
    bottomSheetModalRef_editProfile.current?.present();
  };

  const renderItemLainnya: ListRenderItem<ProfilePros> = ({item}) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => {
        if (item.text === 'Edit Data') {
          bottomSheetModalRef_editProfile.current?.present();
        } else if (item.text === 'Sign Out') {
          handleSignOut();
        } else if (item.text === 'Kalender Akademik') {
          navigation.navigate('Kalender_Akademik');
        }
        // else if (item.text === 'IPK') {
        //   navigation.navigate('IPK');
        // }
      }}>
      <View style={[styles.listItemIcon, {backgroundColor: item.color}]}>
        <Ionicons name={item.icon} size={wp('7.8%')} color={'#FFFFFF'} />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.listItemText,
            item.text === 'Sign Out' && styles.boldText, // Gaya tebal untuk Sign Out
            item.text === 'IPK' && {
              color: '#A9A9A9',
            }, // Warna abu-abu
          ]}>
          {item.text}
        </Text>
        {item.text === 'IPK' && (
          <Text style={styles.comingSoonText}>Coming Soon</Text>
        )}
      </View>
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

  useEffect(() => {
    const fetchUsersData = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Fetched Token:', token);
      if (!token) {
        console.log('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${appSettings.api}/users`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        console.log('Fetched Data:', response.data); // Log fetched data
        setUsersData(response.data);
      } catch (error) {
        console.error('Error fetching Users data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('Fetched Token:', token);
    if (!token) {
      console.log('No token found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${appSettings.api}/users`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log('Fetched Data:', response.data); // Log fetched data
      setUsersData(response.data);
    } catch (error) {
      console.error('Error fetching Users data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true); // Start refreshing
    await fetchUsersData();
  };
  useEffect(() => {
    fetchUsersData();
  }, []);
  const handleUpdateProfile = () => {
    fetchUsersData();
  };

  useFocusEffect(
    useCallback(() => {
      // Close bottom sheet when screen loses focus
      return () => {
        bottomSheetModalRef.current?.close();
        bottomSheetModalRef_editProfile.current?.close();
        bottomSheetModalProfile.current?.close();
        setAvatarPickerVisible(false);
      };
    }, []),
  );

  const resizeMode = selectedAvatar ? 'cover' : 'contain';
  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#13A89D']}
          />
        }>
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackground}
            source={require('../../assets/images/bg_profile2.jpg')}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity onPress={toggleAvatarPicker}>
                <ImageBackground
                  source={
                    selectedAvatar
                      ? {uri: selectedAvatar}
                      : require('../../assets/avatar/hcorp.png')
                  }
                  style={styles.profileImage}
                  resizeMode={resizeMode}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>{username || 'Guest'}</Text>
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileInfoText}>Santri</Text>
              <Text style={styles.profileInfoHighlight}> | PPM BKI</Text>
            </View>
          </ImageBackground>
          <BottomSheetAvatar
            bottomSheetModalRef={bottomSheetModalProfile}
            handleSelectAvatar={handleSelectAvatar}
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.statsContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#B3B3B3',
                }}>
                Coming Soon
              </Text>
            </View>
            {/* <View style={styles.statItem}>
              <View style={styles.statValueContainer}>
                <Text style={styles.statPlus}>+</Text>
                <Text style={styles.statNumber}>70</Text>
                <Text style={styles.statPercentage}>%</Text>
              </View>
              <Text style={styles.statLabel}>Ketercapaian</Text>
            </View> */}
            {/* <TouchableOpacity
              style={styles.statItem2}
              onPress={handlePresentModalPress}>
              <View style={styles.kafarohValueContainer}>
                <Text style={styles.kafarohValue}>{totalItems}</Text>
              </View>
              <Text style={styles.statLabel}>Kafaroh</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Data Diri</Text>
          {UsersData.map(user => (
            <View style={styles.listContainer}>
              <View style={styles.listItemContainer}>
                <View
                  style={[styles.listItemIcon, {backgroundColor: '#C7D02190'}]}>
                  <Ionicons
                    name={'id-card-outline'}
                    size={wp('7.8%')}
                    color={'#FFFFFF'}
                  />
                </View>
                <Text style={styles.listItemText}>{user.nis}</Text>
              </View>
              <View style={styles.listItemContainer}>
                <View
                  style={[styles.listItemIcon, {backgroundColor: '#FFCC90'}]}>
                  <Ionicons
                    name={'book-outline'}
                    size={wp('7.8%')}
                    color={'#FFFFFF'}
                  />
                </View>
                <Text style={styles.listItemText}>{user.class_name}</Text>
              </View>
              <View key={user.id} style={styles.listItemContainer}>
                <View
                  style={[styles.listItemIcon, {backgroundColor: '#13A89D90'}]}>
                  <Ionicons
                    name={'call-outline'}
                    size={wp('7.8%')}
                    color={'#FFFFFF'}
                  />
                </View>
                <Text style={styles.listItemText}>{user.telephone_number}</Text>
              </View>

              <View style={styles.listItemContainer}>
                <View
                  style={[styles.listItemIcon, {backgroundColor: '#94008E80'}]}>
                  <Ionicons
                    name={'locate'}
                    size={wp('7.8%')}
                    color={'#FFFFFF'}
                  />
                </View>
                <Text style={styles.listItemText}>
                  {user.residence_in_semarang}
                </Text>
              </View>
            </View>
          ))}
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
        onUpdate={handleUpdateProfile}
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
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    resizeMode: 'cover',
    // borderWidth: 5,
    // borderColor: '#fff',
    backgroundColor: '#fff',
  },
  profileName: {
    textTransform: 'uppercase',
    marginTop: hp('2%'),
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
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: hp('0.6%'),
    marginBottom: hp('0.4%'),
  },
  kafarohValue: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#13A89D',
  },
  dataContainer: {
    height: hp('80%'), // Hati-hati dengan Ini
    width: wp('100%'),
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: hp('1%'),
    marginBottom: hp('10%'),
  },
  dataLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('4%'),
    color: '#B8B8B8',
    marginTop: hp('1%'),
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
  comingSoonText: {
    fontSize: wp('3.1%'),
    color: '#B3B3B3',
    fontWeight: '700',
  },
  textContainer: {
    flex: 1, // Mengisi ruang tersisa
    flexDirection: 'row',
    justifyContent: 'space-between', // Membuat jarak antar elemen
    alignItems: 'center', // Vertikal rata tengah
  },
});

export default Profile;
