import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import appSettings from '../../Appsettings';

type CardIzinProps = {
  item: {
    nis: string;
    name: string;
    class_id: number;
    class_name: string;
    class_type: string;
    start_date: string;
    end_date: string;
    description: string;
    is_approved: number;
    img_url: string;
    created_at: string;
    updated_at: string;
  };
  isLast: boolean;
};
type RouteParams = {
  CardIzin: {newPermit?: any};
};
const CardIzin: React.FC<CardIzinProps> = ({item, isLast}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [date, time] = item.start_date.split('T');
  const route = useRoute<RouteProp<RouteParams, 'CardIzin'>>();

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Fetched Token:', token);
      if (!token) {
        console.log('No token found');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${appSettings.api}/permits`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      console.log('Response Data:', response.data);

      if (response.data.length === 0) {
        console.log('No data returned from API');
      }

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  let statusColor = '#000';
  if (item.is_approved === 1) {
    statusColor = '#2DCF2A'; // Approved
  } else if (item.is_approved === 0) {
    statusColor = '#FF0000'; // Not Approved
  } else {
    statusColor = '#C7D021'; // Pending
  }

  const getCurrentDayAbbreviation = () => {
    const dayAbbreviations = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    return dayAbbreviations[dayIndex];
  };

  const formatTimeStart = (start_date: string | null) => {
    if (!start_date) return '';
    const date = new Date(start_date);
    return date.toLocaleString('id-ID', {
      // day: '2-digit',
      // month: 'long',
      // year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };
  const formatDate = (start_date: string | null) => {
    if (!start_date) return '';

    const date = new Date(start_date);
    const monthMap: {[key: number]: string} = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'Mei',
      5: 'Jun',
      6: 'Jul',
      7: 'Agu',
      8: 'Sep',
      9: 'Okt',
      10: 'Nov',
      11: 'Des',
    };

    const day = date.toLocaleString('id-ID', {day: '2-digit'});
    const month = monthMap[date.getMonth()];
    const year = date.toLocaleString('id-ID', {year: 'numeric'});

    return `${day} ${month} ${year}`;
  };
  const formatDateTime = (start_date: string | null) => {
    if (!start_date) return '';

    const date = new Date(start_date);
    const dayMap: {[key: number]: string} = {
      0: 'Min',
      1: 'Sen',
      2: 'Sel',
      3: 'Rab',
      4: 'Kam',
      5: 'Jum',
      6: 'Sab',
    };

    const day = dayMap[date.getDay()];
    const dayOfMonth = date.toLocaleString('id-ID', {
      day: '2-digit',
    });

    return `${day}`;
  };

  const formattedDateTime = formatDateTime(item.created_at);
  const formattedTimeStart = formatTimeStart(item.created_at);
  const formattedDate = formatDate(item.start_date);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (route.params?.newPermit) {
      setData(prevData => [route.params.newPermit, ...prevData]);
    }
  }, [route.params?.newPermit]);

  return (
    <View style={[styles.cardContainer, isLast && styles.lastCard]}>
      {loading ? (
        <ActivityIndicator size="large" color="#13A89D" />
      ) : (
        <>
          <View style={styles.innerContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.dayText}>{formattedDateTime}</Text>
              <Text style={styles.timeText}>{formattedTimeStart}</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.detailsContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText} numberOfLines={1}>
                  {item.class_name}
                </Text>
              </View>
              <Text style={styles.class}>{item.class_type}</Text>
              <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.dateText}>
                  {formattedDate}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                <Text
                  style={[styles.statusText, {color: statusColor}]}
                  numberOfLines={1}>
                  {item.is_approved === 1
                    ? 'Disetujui'
                    : item.is_approved === 0
                    ? 'Belum disetujui'
                    : 'Pending'}
                </Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.imageContainer}>
            {/* Gambar Utama */}
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ImageBackground
                source={{uri: `${appSettings.api}${item.img_url}`}}
                style={styles.imageBackground}
                resizeMode="cover"
              />
            </TouchableOpacity>

            {/* Modal untuk Gambar */}
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <Image
                    source={{uri: `${appSettings.api}${item.img_url}`}}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />

                  {/* Tombol Tutup */}
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    style={({pressed}) => [
                      styles.closeButton,
                      pressed && styles.closeButtonPressed, // Style tambahan saat ditekan
                    ]}>
                    <Text style={styles.closeButtonText}>Tutup</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  closeButtonPressed: {
    backgroundColor: '#0e8077',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '90%',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#13A89D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 9,
    height: hp('16%'),
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  lastCard: {
    marginBottom: hp('15%'),
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: wp('55%'),
    marginLeft: wp('-1%'),
  },
  timeContainer: {
    height: '100%',
    width: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: '#B8B8B8',
    fontSize: wp('4.5%'),
    fontWeight: '700',
  },
  timeText: {
    color: '#B8B8B8',
    fontSize: wp('3.5%'),
    fontWeight: '700',
  },
  separator: {
    backgroundColor: '#13A89D',
    height: '100%',
    width: wp('1.5%'),
    marginHorizontal: wp('2%'),
  },
  detailsContainer: {
    width: wp('50%'),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000',
    marginRight: wp('10%'),
  },
  class: {
    color: '#B8B8B8',
    fontSize: wp('3.2%'),
    fontWeight: '500',
    marginRight: wp('10%'),
  },
  name: {
    color: '#B8B8B8',
    fontSize: wp('3%'),
    fontWeight: '500',
  },
  statusContainer: {
    marginTop: hp('0.8%'),
  },
  statusText: {
    fontSize: wp('3.2%'),
    fontWeight: '600',
    marginRight: wp('10%'),
  },
  dateText: {
    fontWeight: '400',
    fontSize: wp('3.1%'),
    color: '#B8B8B8',
    marginRight: wp('10%'),
  },
  description: {
    fontWeight: '400',
    fontSize: wp('2.5%'),
    color: '#B8B8B8',
    marginTop: wp('0.1%'),
    marginRight: wp('10%'),
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: wp('30%'),
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});

export default CardIzin;
