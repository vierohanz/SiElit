import React from 'react';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Definisikan tipe untuk properti item
interface CardNotifProps {
  item: {
    id: string;
    day: string;
    time: string;
    title: string;
    timeRange: string;
  };
}

const CardNotif: React.FC<CardNotifProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.dayText}>{item.day.substring(0, 3)}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Ionicons name={'library'} size={wp('6%')} color={'#B8B8B8'} />
          <Text style={styles.titleText}>{item.title}</Text>
        </View>
        <Text style={styles.timeRangeText}>{item.timeRange}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    height: hp('8%'),
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
});

export default CardNotif;
