import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LinearGradient} from 'react-native-linear-gradient';
import CardRemain from '../components/CardRemain';
import CircleChart from '../components/CircleChart';
import BarChart from '../components/BarChart';
import appSettings from '../../Appsettings';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DataDiri = {
  id: number;
  name: string;
  card_id: string | null;
  password: string;
  birth_date: string;
  grade: string;
  telephone_number: string | null;
  role: number;
  class_type: number;
  gender: number;
  nis: string;
  is_active: number;
  inactive_reason: string | null;
  origin: string;
  residence_in_semarang: string;
  role_name: string;
  class_name: string;
};
function target() {
  const [loading, setLoading] = useState(true);
  const [UsersData, setUsersData] = useState<DataDiri[]>([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Fetched Token:', token);
      if (!token) {
        console.log('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${appSettings.api}/users`, {
          headers: {Authorization: `Bearer ${token}`},
        });
        console.log('Fetched Data:', response.data); // Log fetched data
        setUsersData(response.data);
      } catch (error) {
        console.error('Error fetching Users data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);
  const fetchUsersData = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    console.log('Fetched Token:', token);
    if (!token) {
      console.log('No token found');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${appSettings.api}/users`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log('Fetched Data:', response.data); // Log fetched data
      setUsersData(response.data);
    } catch (error) {
      console.error('Error fetching Users data:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      {UsersData.map(user => (
        <View style={{flex: 1, paddingBottom: hp('15%')}}>
          <LinearGradient
            colors={['#13A89D', '#07423E']}
            style={styles.header}
          />
          <Text style={styles.headerText}>{user.name}</Text>
          <Text style={styles.subheaderText}>Kelas {user.class_name}</Text>
          {/* Target Card */}
          <View style={styles.cardTarget}>
            <View style={styles.titleTarget}>
              <Text style={styles.titleTarget1}>Target </Text>
              <Text style={[styles.titleTarget1, styles.titleTarget2]}>
                Kelas
              </Text>
            </View>
            <View style={styles.circleChart}>
              <CircleChart item={{progress: 60, title: 'Alquran'}} />
              <View style={styles.line}></View>
              <CircleChart item={{progress: 93, title: 'Hadist'}} />
              <View style={styles.line}></View>
              <CircleChart item={{progress: 71, title: 'Hafalan'}} />
              <View style={styles.line}></View>
              <CircleChart item={{progress: 98, title: 'Sikap'}} />
            </View>
            <View style={styles.summaryContainer}>
              <Text style={styles.textStatusProgress}>Status Progress</Text>
              <View style={styles.summaryRectangle}>
                <Text style={styles.textSummary}>Cukup Baik</Text>
              </View>
            </View>
          </View>
          {/* Bar Chart */}
          <View style={styles.cardResult}>
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
          </View>
          {/* Summary Cards */}
          <View style={styles.containerRemain}>
            <CardRemain
              item={{
                RemainNumber: 27,
                indicator: 'Hari',
                detail:
                  'Masih ada waktu 25 hari untuk menyelesaikan target anda',
              }}></CardRemain>
            <CardRemain
              item={{
                RemainNumber: 90,
                indicator: 'Persen',
                detail: 'Akumulasi progress anda akan tercapai 30% lagi',
              }}></CardRemain>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#13A89D',
    height: hp('30%'),
  },
  headerText: {
    textTransform: 'uppercase',
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('4.5%'),
    color: '#C7D021',
    marginTop: hp('-23%'),
    marginBottom: hp('-1%'),
    marginHorizontal: wp('3%'),
  },
  subheaderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: wp('3.5%'),
    color: '#fff',
    marginHorizontal: wp('3%'),
    marginBottom: hp('2%'),
  },
  cardTarget: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('6.5%'),
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    margin: wp('3%'),
  },
  titleTarget: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleTarget1: {
    fontFamily: 'Poppins-Bold',
    fontSize: wp('4%'),
    color: '#13A89D',
  },
  titleTarget2: {
    color: 'black',
  },
  circleChart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //   alignItems: 'center',
    marginHorizontal: wp('2%'),
    marginVertical: hp('1.8%'),
  },
  line: {
    marginTop: wp('7%'),
    width: wp('7%'),
    height: hp('0.2%'),
    backgroundColor: '#C6C6C6',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStatusProgress: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('2.5%'),
    color: 'black',
  },
  summaryRectangle: {
    backgroundColor: '#13A89D',
    width: wp('50%'),
    height: hp('4.4%'),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSummary: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('3.8%'),
    color: 'white',
  },
  cardResult: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 3,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    margin: wp('3%'),
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginVertical: hp('1.8%'),
  },
  containerRemain: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
export default target;
