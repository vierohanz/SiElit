import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type CardPresensiProps = {
  item: {
    day: string;
    time: string;
    title: string;
    timeRange: string;
    status: string;
    updateTime: string;
    date: string;
  };
};

const CardPresensi: React.FC<CardPresensiProps> = ({item}) => {
  let statusColor = '#000';
  if (item.status === 'Hadir') {
    statusColor = '#2DCF2A';
  } else if (item.status === 'Absen') {
    statusColor = '#FF0000';
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.dayText}>{item.day}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Ionicons name={'library'} size={wp('6%')} color={'#B8B8B8'} />
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
          <Text style={styles.timeRangeText}>{item.timeRange}</Text>
          <View style={styles.statusContainer}>
            <Text style={[styles.statusText, {color: statusColor}]}>
              {item.status}
            </Text>
            <Text style={styles.timeComing}>({item.updateTime})</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    marginRight: wp('2%'),
  },
});

export default CardPresensi;
