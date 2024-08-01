import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

// Definisikan tipe untuk properti item
interface CardRemainProps {
  item: {
    RemainNumber: number;
    indicator: string;
    detail: string;
  };
}

const CardRemain: React.FC<CardRemainProps> = ({item}) => {
  return (
    <LinearGradient colors={['#13A89D', '#07423E']} style={styles.cardRemain}>
      <View style={styles.textRemainNumber}>
        <Text style={styles.textRemainNumber1}>
          {Math.floor(item.RemainNumber / 10)}
        </Text>
        <Text style={[styles.textRemainNumber1, styles.textRemainNumber2]}>
          {item.RemainNumber % 10}
        </Text>
      </View>
      <Text style={styles.textIndicator}>{item.indicator}</Text>
      <Text style={styles.textDetailRemain}>{item.detail}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardRemain: {
    width: wp('42%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 15,
    elevation: 3,
    borderColor: '#E3E3E3',
    borderWidth: 1,
  },
  textRemainNumber: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: hp('-5.5%'),
    marginTop: hp('-2%'),
  },
  textRemainNumber1: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('17%'),
    color: '#22EDDE',
  },
  textRemainNumber2: {
    color: 'white',
  },
  textIndicator: {
    marginVertical: hp('1%'),
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: wp('3%'),
    color: 'white',
  },
  textDetailRemain: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp('2%'),
    color: 'white',
  },
});

export default CardRemain;
