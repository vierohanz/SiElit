import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
  };
  isLast: boolean;
};

const CardIzin: React.FC<CardIzinProps> = ({item, isLast}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, time] = item.start_date.split('T');

  const capitalizeFirstLetter = (text: string): string => {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  };

  const formatDates = (dateString: string): string => {
    const date = new Date(dateString);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const truncateToTwoWords = (text: string | null): string => {
    if (!text) return '';
    const words = text.split(' ');
    return words.slice(0, 2).join(' ');
  };

  useEffect(() => {
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

        console.log('Response Status:', response.status); // Log status
        console.log('Response Headers:', response.headers); // Log headers
        console.log('Response Data:', response.data); // Log data

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

    fetchData();
  }, []);

  let statusColor = '#000';
  if (item.is_approved === 1) {
    statusColor = '#2DCF2A'; // Approved
  } else if (item.is_approved === 0) {
    statusColor = '#FF0000'; // Not Approved
  } else {
    statusColor = '#C7D021'; // Pending
  }

  const getCurrentDayAbbreviation = () => {
    const dayAbbreviations = ['MING', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    return dayAbbreviations[dayIndex];
  };

  const getLocalTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formattedTimeStart = time
    ? time.split(':')[0] + ':' + time.split(':')[1]
    : '';

  return (
    <View style={[styles.cardContainer, isLast && styles.lastCard]}>
      {loading ? (
        <ActivityIndicator size="large" color="#13A89D" />
      ) : (
        <>
          <View style={styles.innerContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.dayText}>{getCurrentDayAbbreviation()}</Text>
              <Text style={styles.timeText}>{getLocalTime()}</Text>
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
                <Text style={styles.name} numberOfLines={1}>
                  {capitalizeFirstLetter(truncateToTwoWords(item.name))} |{' '}
                </Text>
                <Text numberOfLines={1} style={styles.dateText}>
                  {formatDates(item.start_date)}
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
            <ImageBackground
              source={{
                uri: `${appSettings.api}${item.img_url}`,
              }}
              style={styles.imageBackground}
              resizeMode="cover"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
