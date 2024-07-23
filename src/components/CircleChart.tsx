import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

// Definisikan tipe untuk properti item
interface CircleChartProps {
  item: {
    progress: number;
    title: string;
  };
}

const CircleChart: React.FC<CircleChartProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#13A89D', '#05FFED']}
        style={styles.outercircle}>
        <View style={styles.innercircle}>
          <Text style={styles.textProgress}>{item.progress}%</Text>
        </View>
      </LinearGradient>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  outercircle: {
    width: wp('14%'),
    height: wp('14%'),
    borderRadius: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innercircle: {
    backgroundColor: 'white',
    width: wp('11.5%'),
    height: wp('11.5%'),
    borderRadius: wp('5.75%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textProgress: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: wp('4.2%'),
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('3.2%'),
    color: 'black',
  },
});

export default CircleChart;
