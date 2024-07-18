import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const data: ProfilePros[] = [
  {
    id: '1',
    image: require('../../assets/images/hannan.jpg'),
    text: 'Item 1',
  },
  {
    id: '2',
    image: require('../../assets/images/hannan.jpg'),
    text: 'Item 2',
  },
  {
    id: '3',
    image: require('../../assets/images/hannan.jpg'),
    text: 'Item 3',
  },
  // Add more items as needed
];
type ProfilePros = {
  id: string;
  image: any;
  text: string;
};
const Profile = () => {
  const renderItem: ListRenderItem<ProfilePros> = ({item}) => (
    <View style={styles.listItemContainer}>
      <Image source={item.image} style={styles.listItemImage} />
      <Text style={styles.listItemText}>{item.text}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackground}
          source={require('../../assets/images/bg_profile.jpg')}
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
          <View style={styles.statItem2}>
            <View style={styles.kafarohValueContainer}>
              <Text style={styles.kafarohValue}>5</Text>
            </View>
            <Text style={styles.statLabel}>Kafaroh</Text>
          </View>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Data Diri</Text>
        <View style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ScrollView>
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
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    height: hp('14%'),
    width: wp('30%'),
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
    marginTop: hp('2%'),
    fontSize: wp('5.3%'),
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: hp('5%'),
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
    marginTop: hp('-5%'),
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
    height: hp('70%'),
    width: wp('100%'),
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  dataLabel: {
    color: '#B8B8B8',
    fontSize: wp('4%'),
    fontWeight: 'bold',
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
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  listItemImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 10,
    marginRight: wp('4%'),
  },
  listItemText: {
    fontSize: wp('4%'),
    color: '#000',
  },
});

export default Profile;
