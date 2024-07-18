import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type CardIzinProps = {
  item: {
    day: string;
    time: string;
    title: string;
    class: string;
    status: string;
    name: string;
    date: string;
    description: string;
  };
  isLast: boolean;
};

const CardIzin: React.FC<CardIzinProps> = ({item, isLast}) => {
  let statusColor = '#000';
  if (item.status === 'Disetujui') {
    statusColor = '#2DCF2A';
  } else if (item.status === 'Ditolak') {
    statusColor = '#FF0000';
  } else {
    statusColor = '#C7D021';
  }

  return (
    <View style={[styles.cardContainer, isLast && styles.lastCard]}>
      <View style={styles.innerContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.dayText}>{item.day}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
          <Text style={styles.class}>{item.class}</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name} |{' '}
            </Text>
            <Text numberOfLines={1} style={styles.dateText}>
              {item.date}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <Text
              style={[styles.statusText, {color: statusColor}]}
              numberOfLines={1}>
              {item.status}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require('../assets/images/hannan.jpg')}
          style={styles.imageBackground}
          resizeMode="cover"></ImageBackground>
      </View>
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
    fontSize: wp('3.2%'),
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
    height: '100%',
    width: wp('29%'),
    borderRadius: 18,
    overflow: 'hidden',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    borderRadius: 18,
  },
});

export default CardIzin;
