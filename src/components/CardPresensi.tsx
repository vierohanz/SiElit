import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Format waktu untuk menampilkan jam dan menit
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    return `${hour}:${minute}`;
  };

  // Format waktu attend_at
  const formatAttendTime = (attend_at: string | null) => {
    if (!attend_at) return '';
    const date = new Date(attend_at);
    return date.toLocaleString('id-ID', {
      // day: '2-digit',
      // month: 'long',
      // year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
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
  const formatTimeEnd = (end_date: string | null) => {
    if (!end_date) return '';
    const date = new Date(end_date);
    return date.toLocaleString('id-ID', {
      // day: '2-digit',
      // month: 'long',
      // year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
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

  const formattedTimeStart = formatTimeStart(item.start_date);
  const formattedTimeEnd = formatTimeEnd(item.end_date);
  const formattedTimeAttend = formatAttendTime(item.attend_at);
  const formattedDateTime = formatDateTime(item.start_date);

  const truncatedClassName =
    item.class_name.length > 18
      ? item.class_name.substring(0, 18) + '..'
      : item.class_name;

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
      statusColor = '#0047FF'; // Blue
      break;
    case 'terlambat':
      statusColor = '#FFD700'; // Yellow
      break;
    default:
      statusColor = '#FF0000'; // Red for unknown status
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.dayText}>{formattedDateTime}</Text>
          <Text style={styles.timeText}>{formattedTimeStart}</Text>
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
            <Text style={styles.timeComing}>({formattedTimeAttend})</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.dateText}>{formatDate(item.start_date)}</Text>
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
