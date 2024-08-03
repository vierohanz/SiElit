import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formatDate} from './DateUtils';

type PresensiItem = {
  user_id: number;
  class_id: number;
  nis: string;
  name: string;
  grade: string;
  gender: number;
  class_name: string;
  class_type: string;
  start_date: string;
  end_date: string;
  attend_at: string | null;
  status: string | null;
  lastEditBy: string;
};

type CardPresensiProps = {
  item: PresensiItem;
};

const CardPresensi: React.FC<CardPresensiProps> = ({item}) => {
  const [loading, setLoading] = useState(true);
  const [date, time] = item.start_date.split('T');
  const [date2, time2] = item.end_date.split('T');
  const [date3, time3] = item.attend_at ? item.attend_at.split('T') : ['', ''];

  // Format tanggal untuk mendapatkan nama hari dengan maksimal 3 karakter
  const dateObject = new Date(date);
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const dayName = dayNames[dateObject.getDay()];

  // Format tanggal dalam format 'DD MMMM YYYY'
  const formattedDate = formatDate(date);

  // Format waktu untuk menampilkan jam dan menit
  const formattedTimeEnd = time2
    ? time2.split(':')[0] + ':' + time2.split(':')[1]
    : '';

  const formattedTimeStart = time
    ? time.split(':')[0] + ':' + time.split(':')[1]
    : '';

  const formattedTimeAttend = time3
    ? time3.split(':')[0] + ':' + time3.split(':')[1]
    : '';

  const truncatedClassName =
    item.class_name.length > 18
      ? item.class_name.substring(0, 18) + '..'
      : item.class_name;

  const getLocalTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#13A89D" />
      </View>
    );
  }

  let statusColor = '#FF0000'; // Default color red for "Tidak Hadir"
  const statusText = item.status ? item.status : 'tidak hadir'; // Default status to "Tidak Hadir" if null

  switch (statusText) {
    case 'hadir':
      statusColor = '#2DCF2A'; // Green
      break;
    case 'izin':
      statusColor = '#0047FF'; // Yellow
      break;
    case 'terlambat':
      statusColor = '#FFD700'; // Red
      break;
    default:
      statusColor = '#FF0000'; // Red for unknown status
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.dayText}>{dayName} </Text>
          <Text style={styles.timeText}>{formattedTimeStart} </Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Ionicons name={'library'} size={wp('6%')} color={'#B8B8B8'} />
            <Text style={styles.titleText}>{truncatedClassName}</Text>
          </View>
          <Text style={styles.timeRangeText}>
            {formattedTimeStart} - {formattedTimeEnd}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={[styles.statusText, {color: statusColor}]}>
              {statusText}
            </Text>
            <Text style={styles.timeComing}>({getLocalTime()})</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    height: hp('12%'),
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
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('12%'),
  },
  timeContainer: {
    height: '100%',
    marginLeft: wp('2%'),
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
    height: '80%',
    width: wp('1.5%'),
    marginLeft: wp('3.5%'),
  },
  detailsContainer: {
    marginLeft: wp('2%'),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: wp('4.1%'),
    fontWeight: 'bold',
    color: '#000',
    marginLeft: wp('2%'),
  },
  timeRangeText: {
    color: '#B8B8B8',
    fontSize: wp('4.1%'),
  },
  timeComing: {
    color: '#B8B8B8',
    fontSize: wp('4.1%'),
    marginLeft: wp('1%'),
  },
  statusContainer: {
    flexDirection: 'row',
    marginTop: hp('0.8%'),
  },
  statusText: {
    fontSize: wp('4.1%'),
    fontWeight: '600',
  },
  dateText: {
    fontWeight: '400',
    fontSize: wp('3.2%'),
    color: '#B8B8B8',
    marginTop: wp('1%'),
    marginRight: wp('4%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardPresensi;
