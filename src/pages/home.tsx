import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CardNotif from '../components/CardNotif';
import TableJadwal from '../components/Table';

const {height, width} = Dimensions.get('window');
function home() {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {/* Landing Page */}
        <View
          style={{
            height: height * 0.43,
            width: '100%',
            marginBottom: hp('1.5%'),
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,

            // Shadow for Android
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 15,
          }}>
          <ImageBackground
            source={require('../assets/images/bg_blue.jpg')}
            style={{
              height: height * 0.43,
              width: '100%',
            }}
            imageStyle={{
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: '50%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp('3%'),
                }}>
                <View style={{marginTop: wp('15%'), width: width * 0.6}}>
                  <Text
                    style={{
                      fontSize: wp('7%'),
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                    Halo, Raishannan
                  </Text>
                  <Text
                    style={{
                      fontSize: wp('4%'),
                      fontWeight: '300',
                      color: '#fff',
                    }}>
                    Apakah anda siap menjadi mubaligh sarjana
                  </Text>
                </View>
                <View style={styles.profileContainer}>
                  <Image
                    source={require('../assets/images/hannan.jpg')}
                    style={styles.profileImage}
                  />
                </View>
              </View>
              <ImageBackground
                source={require('../assets/images/mosque.png')}
                style={{
                  height: height * 0.21,
                  width: '100%',
                }}
                imageStyle={{
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                }}></ImageBackground>
            </View>
          </ImageBackground>
        </View>

        {/* Notification */}
        <View style={{marginTop: hp('0.5%'), paddingHorizontal: 10}}>
          <Text
            style={{
              fontSize: wp('5%'),
              fontWeight: '800',
              color: '#000',
              marginBottom: 10,
            }}>
            Notification
          </Text>
          <CardNotif />
        </View>

        {/* Jadwal Kelas */}
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp('2%'),
          }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{fontSize: wp('6%'), fontWeight: '800', color: '#000'}}>
              Jadwal
            </Text>
            <Text
              style={{
                marginLeft: wp('1%'),
                fontSize: wp('6%'),
                fontWeight: '900',
                color: '#13A89D',
              }}>
              Kelas
            </Text>
          </View>
          <TableJadwal />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  profileContainer: {
    marginLeft: 10,
    marginTop: wp('15%'),
  },
  profileImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 45,
    borderColor: '#fff',
    borderWidth: 1,
  },
});
export default home;
