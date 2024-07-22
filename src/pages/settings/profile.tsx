import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const datadiri: ProfilePros[] = [
  // Data Diri
  {
    id: '1',
    icon: 'mail-outline',
    color: '#C7D02190',
    text: 'johndoe@gmail.com',
  },
  {
    id: '2',
    icon: 'call-outline',
    color: '#13A89D90',
    text: '+6289504469254',
  },
  {
    id: '3',
    icon: 'locate',
    color: '#94008E80',
    text: 'Ds. Manokwari Rt 01 / Rw 03',
  },
];

const datalainnya: ProfilePros[] = [
  // Data Diri
  {
    id: '1',
    icon: 'create-outline',
    color: '#0047FF60',
    text: 'Edit Data',
  },
  {
    id: '2',
    icon: 'ribbon-outline',
    color: '#45E62B80',
    text: 'IPK',
  },
  {
    id: '3',
    icon: 'calendar-number-outline',
    color: '#FF00F560',
    text: 'Kalender Akademik',
  },
  {
    id: '4',
    icon: 'log-out-outline',
    color: '#FFA6A6',
    text: 'Sign Out',
  },
];
type ProfilePros = {
  id: string;
  icon: string;
  color: string;
  text: string;
};
const Profile = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const renderItemDataDiri: ListRenderItem<ProfilePros> = ({item}) => (
    <View style={styles.listItemContainer}>
      <View style={[styles.listItemIcon, {backgroundColor: item.color}]}>
        <Ionicons name={item.icon} size={wp('7.8%')} color={'#FFFFFF'} />
      </View>
      <Text style={styles.listItemText}>{item.text}</Text>
    </View>
  );

  const renderItemLainnya: ListRenderItem<ProfilePros> = ({item}) => (
    <View style={styles.listItemContainer}>
      <View style={[styles.listItemIcon, {backgroundColor: item.color}]}>
        <Ionicons name={item.icon} size={wp('7.8%')} color={'#FFFFFF'} />
      </View>
      <Text
        style={[
          styles.listItemText,
          item.text === 'Sign Out' && styles.boldText,
        ]}>
        {item.text}
      </Text>
    </View>
  );
  return (
    <BottomSheetModalProvider>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackground}
            source={require('../../assets/images/bg_profile2.jpg')}
            resizeMode="cover">
            <View style={styles.profileImageContainer}>
              <ImageBackground
                source={require('../../assets/images/hannan.jpg')}
                resizeMode="cover"
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.profileName}>Rais Hannan Rizanto</Text>
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileInfoText}>Santri</Text>
              <Text style={styles.profileInfoHighlight}> | PPM BKI</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statValueContainer}>
                <Text style={styles.statPlus}>+</Text>
                <Text style={styles.statNumber}>70</Text>
                <Text style={styles.statPercentage}>%</Text>
              </View>
              <Text style={styles.statLabel}>Ketercapaian</Text>
            </View>
            <TouchableOpacity
              style={styles.statItem2}
              onPress={handlePresentModalPress}>
              <View style={styles.kafarohValueContainer}>
                <Text style={styles.kafarohValue}>5</Text>
              </View>
              <Text style={styles.statLabel}>Kafaroh</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Data Diri</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={datadiri}
              renderItem={renderItemDataDiri}
              keyExtractor={item => item.id}
            />
          </View>
          <Text style={styles.dataLabel}>Lainnya</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={datalainnya}
              renderItem={renderItemLainnya}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['25%', '50%']}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.7}
            appearsOnIndex={1}
            disappearsOnIndex={-1}
          />
        )}>
        <View style={{}}>
          <Text style={{color: '#eee'}}>This is the Kafaroh Bottom Sheet</Text>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: hp('45%'),
    backgroundColor: '#000',
  },
  headerBackground: {
    height: hp('100%'),
    width: wp('100%'),
    display: 'flex',
    marginVertical: -hp('50%'),
    paddingTop: hp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    height: hp('14%'),
    width: hp('14%'),
    backgroundColor: '#000',
    borderRadius: 70,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileImage: {
    height: '100%',
  },
  profileName: {
    marginTop: hp('1%'),
    fontSize: wp('5.3%'),
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  profileInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: hp('-1%'),
  },
  profileInfoText: {
    fontSize: wp('3.3%'),
    color: '#fff',
  },
  profileInfoHighlight: {
    fontSize: wp('3.3%'),
    color: '#C7D021',
    fontWeight: '600',
  },
  mainContainer: {
    height: hp('6%'),
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
  },
  statsContainer: {
    height: hp('8%'),
    width: wp('80%'),
    backgroundColor: '#fff',
    borderRadius: 40,
    marginTop: hp('-4%'),
    elevation: 5,
    paddingVertical: hp('1%'),
    display: 'flex',
    flexDirection: 'row',
  },
  statItem: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1.5,
    borderRightColor: '#13A89D',
  },
  statItem2: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1.5,
    borderLeftColor: '#13A89D',
  },
  statValueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 2,
  },
  statPlus: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#13A89D',
    marginBottom: hp('0.3%'),
  },
  statNumber: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: '#13A89D',
  },
  statPercentage: {
    fontSize: wp('6%'),
    fontWeight: '400',
    color: '#13A89D',
    marginBottom: hp('0.2%'),
  },
  statLabel: {
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  kafarohValueContainer: {
    display: 'flex',
    backgroundColor: '#D2EEEC',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 5,
    marginBottom: hp('0.4%'),
  },
  kafarohValue: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#13A89D',
  },
  dataContainer: {
    height: hp('75%'), // Hati-hati dengan Ini
    width: wp('100%'),
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  dataLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('4%'),
    color: '#B8B8B8',
    // fontWeight: 'bold',
  },
  listContainer: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#fff',
    marginTop: hp('1%'),
    borderRadius: 15,
    elevation: 3,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    marginBottom: hp('1%'),
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  listItemIcon: {
    height: wp('10.8%'),
    width: wp('10.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  listItemText: {
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Regular',
    paddingLeft: 17,
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#FE0000',
  },
  bottomSheet: {},
});

export default Profile;
