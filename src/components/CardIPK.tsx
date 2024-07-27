import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

// Definisikan tipe untuk properti item
interface CardIPKProps {
  item: {
    RemainNumber: number;
    indicator: string;
    detail: string;
  };
}

const CardIPK: React.FC<CardIPKProps> = ({item}) => {
  return (
    <View style={styles.cardRemain}>
      <View style={styles.textRemainNumber}>
        <Text style={styles.textRemainNumber1}>{item.RemainNumber}</Text>
      </View>
      <Text style={styles.textIndicator}>{item.indicator}</Text>
      <Text style={styles.textDetailRemain}>{item.detail}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardRemain: {
    backgroundColor: '#13A89D',
    width: wp('36%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 30,
    elevation: 3,
    borderColor: '#E3E3E3',
    borderWidth: 1,
  },
  textRemainNumber: {
    flexDirection: 'row',
    marginBottom: hp('-3.2%'),
    marginTop: hp('-3.5%'),
  },
  textRemainNumber1: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('20%'),
    color: 'white',
  },
  textIndicator: {
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

export default CardIPK;
