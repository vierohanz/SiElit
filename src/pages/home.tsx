import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {AuthContext} from '../auth/AuthContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CardNotif from '../components/CardNotif';
import TableJadwal from '../components/Table';

const {height, width} = Dimensions.get('window');

// Data jadwal contoh
const jadwalData = [
  {
    id: '1',
    day: 'Senin',
    time: '08:00',
    title: 'Materi Pembelajaran',
    timeRange: '08:00 - 10:00 WIB',
  },
  {
    id: '2',
    day: 'Selasa',
    time: '10:00',
    title: 'Rapat Tim',
    timeRange: '10:00 - 12:00 WIB',
  },
];

const Home = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {logout} = useContext(AuthContext);
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

  const truncateText = (text: string | null, maxLength: number) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text || '';
  };

  return (
    <ScrollView style={styles.container}>
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
              <Text style={styles.welcomeText}>
                Halo, {truncateText(username, 25) || 'Guest'}
              </Text>
              <Text style={styles.subText}>
                Apakah anda siap menjadi mubaligh sarjana
              </Text>
            </View>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/images/hannan.jpg')}
                style={styles.profileImage}
              />
            </View>
          </View>
          <ImageBackground
            source={require('../assets/images/mosque.png')}
            style={styles.bottomImageBackground}
            imageStyle={styles.bottomImageStyle}
          />
        </ImageBackground>
      </View>

      {/* Notification */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationTitle}>Notification</Text>
        {jadwalData.map(item => (
          <CardNotif key={item.id} item={item} />
        ))}
      </View>

      {/* Jadwal Kelas */}
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleTitleContainer}>
          <Text style={styles.scheduleTitle}>Jadwal</Text>
          <Text style={styles.scheduleSubtitle}>Kelas</Text>
        </View>
        <TableJadwal />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 45,
    borderColor: '#fff',
    borderWidth: 1,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
  },
  scheduleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleTitle: {
    fontSize: wp('6%'),
    fontWeight: '800',
    color: '#000',
  },
  scheduleSubtitle: {
    marginLeft: wp('1%'),
    fontSize: wp('6%'),
    fontWeight: '900',
    color: '#13A89D',
  },
});

export default Home;
