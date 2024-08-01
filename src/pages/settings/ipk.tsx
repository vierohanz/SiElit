import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RootStackParamList} from '../../../App';
import CircleChartIPK from '../../components/CircleChartIPK';
import BarChart from '../../components/BarChart';
import CardIPK from '../../components/CardIPK';
import {ScrollView} from 'react-native-gesture-handler';

const ipk: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.2)"
        translucent={true}
      />
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.headContainer}>
          <View>
            <Text style={styles.textIPK}>IPK</Text>
            <Text style={styles.textAnda}>Anda</Text>
            <Text style={styles.textGreet}>
              Selamat atas perolehan {'\n'}nilai anda
            </Text>
          </View>
          <CircleChartIPK item={{poin: 3.53, title: 'GPA'}}></CircleChartIPK>
        </View>
        <View style={styles.cardBody1}>
          <View style={styles.cardBody2}>
            <Text style={styles.cardTitle}>Statistic</Text>
            <View style={styles.barChart}>
              <BarChart
                item={{
                  progress: 89,
                  title: 'Alquran',
                  color: '#0A4843',
                }}></BarChart>
              <BarChart
                item={{
                  progress: 60,
                  title: 'Hadist',
                  color: '#0D524D',
                }}></BarChart>
              <BarChart
                item={{
                  progress: 72,
                  title: 'Hafalan',
                  color: '#1F938B',
                }}></BarChart>
              <BarChart
                item={{
                  progress: 55,
                  title: 'Kehadiran',
                  color: '#129087',
                }}></BarChart>
              <BarChart
                item={{
                  progress: 83,
                  title: 'Sikap',
                  color: '#13A89D',
                }}></BarChart>
              <BarChart
                item={{
                  progress: 58,
                  title: 'keaktifan',
                  color: '#14DDCE',
                }}></BarChart>
              <BarChart
                item={{
                  progress: 30,
                  title: 'Alpha',
                  color: '#18F4E3',
                }}></BarChart>
            </View>
            {/* Isi hal baru */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: hp('5%'),
              }}>
              <CardIPK
                item={{
                  RemainNumber: 80,
                  indicator: 'Value',
                  detail: 'Value yang sudah dirata-rata keseluruhan semester 2',
                }}
              />
              <CardIPK
                item={{
                  RemainNumber: 96,
                  indicator: 'Average',
                  detail: 'Avarage dari keseluruhan semester 2',
                }}
              />
            </View>
            <View style={styles.cardTotal}>
              <Text style={styles.cardTotalTitle}>Munaqosyah</Text>
              <Text style={styles.cardTotalTitle}>Kefahaman</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconButton: {height: hp('4%'), width: wp('5%')},
  header: {
    paddingHorizontal: 10,
    height: hp('4.5%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('7%'),
  },
  headContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('7%'),
    justifyContent: 'space-around',
  },
  textIPK: {
    fontFamily: 'Poppins-Bold',
    color: '#13A89D',
    fontSize: wp('12%'),
    marginBottom: wp('-8%'),
  },
  textAnda: {
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    fontSize: wp('9%'),
    marginBottom: wp('-2%'),
  },
  textGreet: {
    fontFamily: 'Poppins-Regular',
    color: '#B8B8B8',
  },
  cardBody1: {
    width: wp('100%'),
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    backgroundColor: '#13A89D',
    marginTop: hp('5%'),
    padding: 20,
    paddingBottom: 0,
  },
  cardBody2: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('6%'),
    color: '#13A89D',
    textAlign: 'center',
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginVertical: hp('1.8%'),
    marginHorizontal: wp('-2%'),
  },
  cardTotal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('0.5%'),
    marginBottom: hp('5%'),
  },
  cardTotalTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    fontSize: wp('3.2%'),
  },
});

export default ipk;
