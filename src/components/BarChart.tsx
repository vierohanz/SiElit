import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Definisikan tipe untuk properti item
interface BarChartProps {
  item: {
    progress: number;
    title: string;
    color: string;
  };
}

const BarChart: React.FC<BarChartProps> = ({item}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.progressnumber}>{item.progress}%</Text>
      <View
        style={{
          width: wp('6.5%'),
          height: (hp('25%') * item.progress) / 100,
          backgroundColor: item.color,
          marginBottom: 5,
        }}></View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressnumber: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: wp('4%'),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: wp('2.5%'),
  },
});

export default BarChart;
