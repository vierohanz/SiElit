import React, {useState, useCallback, useEffect, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  ListRenderItem,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {AuthContext} from '../auth/AuthContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ParallaxCarousel from '../components/paralax';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useProfile} from '../context/profileContext';
import {green} from 'react-native-reanimated/lib/typescript/Colors';
import appSettings from '../../Appsettings';
import axios from 'axios';

const {height, width} = Dimensions.get('window');

type jadwalUpcoming = {
  id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
};
type DataItem = {
  id: string;
  gradient: string[];
  icon: any;
  color?: string;
  caption: string;
  caption2: string;
};

const data: DataItem[] = [
  {
    id: '1',
    gradient: ['#13A89D', '#000'],
    icon: 'business',
    color: '#fff',
    caption: 'GSG',
    caption2: 'Gedung Serba Guna',
  },
  {
    id: '2',
    gradient: ['#13A89D', '#000'],
    icon: 'wifi',
    caption: 'WIFI',
    color: '#fff',
    caption2: 'Internet Gratis',
  },
  {
    id: '3',
    gradient: ['#13A89D', '#000'],
    icon: 'bicycle',
    color: '#fff',
    caption: 'Sport',
    caption2: 'Olahraga',
  },
  {
    id: '4',
    gradient: ['#13A89D', '#000'],
    icon: 'restaurant',
    color: '#fff',
    caption: 'Dapur',
    caption2: 'Permasakan',
  },
];
const renderItem: ListRenderItem<DataItem> = ({item}) => (
  <LinearGradient colors={item.gradient} style={styles.item}>
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 7,
        backgroundColor: '#fff',
        borderRadius: 20,
      }}>
      <View
        style={{
          height: hp('6%'),
          width: wp('13%'),
          backgroundColor: '#13A89D',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Ionicons name={item.icon} size={25} color={item.color} />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: 'Poppins-Bold', color: '#000'}}>
          {item.caption}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: '#000',
            fontSize: wp('2%'),
          }}>
          {item.caption2}
        </Text>
      </View>
    </View>
  </LinearGradient>
);
const Home: React.FC = () => {
  const {selectedAvatar, setSelectedAvatar} = useProfile();
  const [jadwalUpcoming, setjadwalUpcoming] = useState<jadwalUpcoming[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJadwalUpcoming = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('Fetched Token:', token);
    if (!token) {
      console.log('No token found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${appSettings.api}/classes/upcoming`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log('Fetched Data:', response.data); // Log fetched data
      setjadwalUpcoming(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchJadwalUpcoming();
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
  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const storedAvatar = await AsyncStorage.getItem('selectedAvatar');
        if (storedAvatar) {
          setSelectedAvatar(storedAvatar);
        }
      } catch (error) {
        console.error('Failed to load avatar from AsyncStorage:', error);
      }
    };

    loadAvatar();
    fetchJadwalUpcoming();
  }, [setSelectedAvatar]);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchJadwalUpcoming();
    try {
      // Your refresh logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a network request
      // Re-fetch data or refresh state as needed
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const truncateToTwoWords = (text: string | null): string => {
    if (!text) return '';
    const words = text ? text.split(' ') : [];
    return words.slice(0, 2).join(' ');
  };
  const capitalizeFirstLetter = (text: string): string => {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  };

  const formattedText = capitalizeFirstLetter(
    truncateToTwoWords(username) || 'Guest',
  );

  const fontSize =
    formattedText.length > 15 ? styles.smallFontSize : styles.normalFontSize;

  const handleAvatarPress = () => {
    navigation.navigate('Index', {screen: 'profile'});
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        // Tidak melakukan apa-apa saat tombol kembali ditekan
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );
  const resizeMode = selectedAvatar ? 'cover' : 'contain';
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0'); // Tambahkan leading zero jika perlu
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Tambahkan leading zero jika perlu
    return `${hours}:${minutes} WIB`;
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#13A89D']}
        />
      }>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.2)" // Adjust color and opacity
        barStyle="light-content" // Change to 'dark-content' for light backgrounds
      />
      {/* Landing Page */}
      <View style={styles.landingContainer}>
        <ImageBackground
          source={require('../assets/images/bg_blue.jpg')}
          style={styles.landingImageBackground}
          imageStyle={styles.landingImageStyle}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={[styles.welcomeText, fontSize]}>
                Halo, {formattedText}
              </Text>
              <Text style={styles.subText}>
                Apakah anda siap menjadi mubaligh mubalighot sarjana
              </Text>
            </View>
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={handleAvatarPress}>
                {selectedAvatar ? (
                  <Image
                    source={{uri: selectedAvatar}}
                    style={styles.profileImage}
                    resizeMode={resizeMode}
                  />
                ) : (
                  <Image
                    source={require('../assets/avatar/hcorp.png')}
                    style={styles.profileImage}
                    resizeMode={resizeMode}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <ImageBackground
            source={require('../assets/images/mosque.png')}
            style={styles.bottomImageBackground}
            imageStyle={styles.bottomImageStyle}
          />
        </ImageBackground>
      </View>

      <View
        style={{
          height: 100,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp('-8.5%'),
        }}>
        <View
          style={{
            height: hp('8%'),
            width: wp('76%'),
            borderRadius: wp('5%'),
            alignItems: 'center',
            paddingHorizontal: wp('5%'),
            paddingVertical: hp('2.5%'),
            backgroundColor: 'white',
            borderColor: '#ccc',
            elevation: 3,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              resizeMode="cover"
              source={require('../assets/images/splash.png')}
              style={{
                width: wp('10%'),
                height: hp('4.7%'),
                borderRadius: 50,
              }}
            />
            <View style={{marginLeft: wp('2%')}}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: wp('4.2%'),
                  color: '#13A89D',
                }}>
                PPM BKI
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: wp('3%'),
                  color: 'black',
                }}>
                2024 | Santri
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#D2EEEC',
              height: hp('4.7%'),
              width: wp('25%'),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                color: '#13A89D',
                fontSize: wp('6%'),
              }}>
              165
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          height: hp('28%'),
          width: wp('100%'),
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            color: '#000',
            fontSize: wp('4.7%'),
            marginLeft: wp('4%'),
            marginTop: hp('1.5%'),
            marginBottom: hp('1%'),
          }}>
          Coming soon
        </Text>
        <ParallaxCarousel />
      </View>
      <View
        style={{
          flexDirection: 'column',
          marginTop: hp('7%'),
        }}>
        {jadwalUpcoming && jadwalUpcoming.length > 0 && (
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: '#000',
              fontSize: wp('4.7%'),
              marginLeft: wp('4%'),
              marginTop: hp('1.5%'),
              marginBottom: hp('1%'),
            }}>
            Jadwal pengajian
          </Text>
        )}

        <FlatList
          data={jadwalUpcoming}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View
              style={{
                marginHorizontal: wp('4%'),
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
                height: hp('13%'),
                backgroundColor: '#fff',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 6,
              }}>
              {/* Sidebar Warna dengan Gradient */}
              <LinearGradient
                colors={['#4CAF50', '#13A89D']}
                style={{
                  width: wp('6%'),
                  height: '100%',
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                }}
              />

              <View style={{marginLeft: wp('4%')}}>
                <Text
                  style={{
                    fontSize: wp('4.5%'),
                    fontWeight: '600',
                    color: '#000',
                  }}>
                  {item.name}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: hp('0.8%'),
                  }}>
                  <Icon name="calendar" size={wp('4%')} color="#666" />
                  <Text
                    style={{
                      fontSize: wp('3.5%'),
                      color: '#666',
                      marginLeft: wp('1%'),
                    }}>
                    {formatDate(item.start_date)}
                  </Text>
                  <Icon
                    name="clock-outline"
                    size={wp('4%')}
                    color="#666"
                    style={{marginLeft: wp('3%')}}
                  />
                  <Text
                    style={{
                      fontSize: wp('3.5%'),
                      color: '#666',
                      marginLeft: wp('1%'),
                    }}>
                    {formatTime(item.start_date)}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: hp('0.5%'),
                  }}>
                  <Icon name="map-marker" size={wp('4%')} color="#666" />
                  <Text
                    style={{
                      fontSize: wp('3%'),
                      color: '#666',
                      marginLeft: wp('1%'),
                    }}>
                    {item.location}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <View
        style={{
          height: hp('40%'),
          flexDirection: 'column',
          marginTop: hp('2%'),
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            color: '#000',
            fontSize: wp('4.7%'),
            marginLeft: wp('4%'),
            marginBottom: hp('1%'),
          }}>
          Fasilitas
        </Text>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            alwaysBounceHorizontal
            bounces={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginBottom: hp('8.5%'),
  },
  landingContainer: {
    height: height * 0.43,
    width: '100%',
    marginBottom: hp('1.5%'),
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 15,
  },
  landingImageBackground: {
    height: height * 0.43,
    width: '100%',
  },
  landingImageStyle: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp('3%'),
  },
  textContainer: {
    marginTop: wp('15%'),
    width: width * 0.6,
  },
  welcomeText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '#fff',
  },
  smallFontSize: {
    fontSize: wp('5%'),
  },
  normalFontSize: {
    fontSize: wp('6%'),
  },
  subText: {
    marginTop: '2%',
    paddingRight: wp('10%'),
    fontSize: wp('4%'),
    fontWeight: '300',
    color: '#fff',
  },
  profileContainer: {
    marginLeft: 10,
    marginTop: wp('15%'),
  },
  profileImage: {
    backgroundColor: '#fff',
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 45,
    borderColor: '#fff',
    borderWidth: 2,
  },
  bottomImageBackground: {
    height: height * 0.21,
    width: '100%',
  },
  bottomImageStyle: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  notificationContainer: {
    marginTop: hp('0.5%'),
    paddingHorizontal: 10,
  },
  notificationTitle: {
    fontSize: wp('5%'),
    fontWeight: '800',
    color: '#000',
    marginBottom: 10,
  },
  scheduleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  scheduleTitleContainer: {
    marginLeft: wp('4%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleTitle: {
    color: '#000',
    fontSize: wp('4.7%'),
    fontFamily: 'Poppins-Bold',
  },
  scheduleSubtitle: {
    marginLeft: wp('1%'),
    color: '#000',
    fontSize: wp('4.5%'),
    fontFamily: 'Poppins-Bold',
  },
  iconContainer: {
    width: wp('2%'),
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  list: {
    paddingEnd: 10,
    justifyContent: 'space-around',
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: wp('3%'),
    width: wp('30%'),
    height: hp('19%'),
    borderRadius: 25,
    padding: 6,
    elevation: 6,
  },
});

export default Home;
