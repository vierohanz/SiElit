import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

// Definisikan tipe untuk properti item
interface CircleChartIPKProps {
  item: {
    poin: number;
    title: string;
  };
}

const CircleChartIPK: React.FC<CircleChartIPKProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#07423E', '#13A89D', '#00FFEC']}
        style={styles.outercircle}>
        <View style={styles.innercircle}>
          <Text style={styles.textPoin}>{item.poin}</Text>

          <Text style={styles.textTitle}>{item.title}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  outercircle: {
    width: wp('33%'),
    height: wp('33%'),
    borderRadius: wp('16.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innercircle: {
    backgroundColor: 'white',
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('14%'),
    justifyContent: 'flex-end',
    paddingVertical: wp('3%'),
    alignItems: 'center',
  },
  textPoin: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: wp('7.2%'),
  },
  textTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('2.2%'),
    color: 'black',
  },
});

export default CircleChartIPK;
