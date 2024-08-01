import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const avatars = [
  require('../assets/avatar/Woman_1.png'),
  require('../assets/avatar/Woman_2.png'),
  require('../assets/avatar/Woman_3.png'),
  require('../assets/avatar/Woman_4.png'),
  require('../assets/avatar/Woman_5.png'),
  require('../assets/avatar/Woman_6.png'),
  require('../assets/avatar/Woman_7.png'),
  require('../assets/avatar/Woman_8.png'),
  require('../assets/avatar/Men_1.png'),
  require('../assets/avatar/Men_2.png'),
  require('../assets/avatar/Men_3.png'),
  require('../assets/avatar/Men_4.png'),
  require('../assets/avatar/Men_5.png'),
  require('../assets/avatar/Men_6.png'),
  require('../assets/avatar/Men_7.png'),
  require('../assets/avatar/Men_8.png'),
  // require('../assets/avatar/hcorp.png'),

  // Tambahkan avatar lainnya sesuai kebutuhan
];
type AvatarPickerProps = {
  onSelectAvatar: (avatar: string) => void;
};
const AvatarPicker: React.FC<AvatarPickerProps> = ({onSelectAvatar}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title1}>Pilih</Text>
        <Text style={styles.title2}> Avatar</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}>
        <View style={styles.avatarContainer}>
          {avatars.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                onSelectAvatar(Image.resolveAssetSource(avatar).uri)
              }>
              <Image source={avatar} style={styles.avatar} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    width: wp('100%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
    width: '100%',
  },
  title1: {
    fontFamily: 'Poppins-Bold',
    color: '#000',
    fontSize: wp('6.5%'),
  },
  title2: {
    fontFamily: 'Poppins-Bold',
    color: '#13A89D',
    fontSize: wp('6.5%'),
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatar: {
    resizeMode: 'contain',
    width: wp('20%'),
    height: hp('8%'),
    borderRadius: 40,
    marginVertical: hp('2%'),
    marginHorizontal: wp('2%'),
  },
});

export default AvatarPicker;
