import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useWindowDimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import TextInputIzin from './TextInputIzin';
import ButtonIzin from './ButtonIzin';

interface EditProfileBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handlePresentModalPress: () => void;
  data: Data;
}

interface SectionItem {
  title: string;
  items: string[];
}

interface Data {
  [key: string]: SectionItem[];
}

const EditProfileBottomSheet: React.FC<EditProfileBottomSheetProps> = ({
  bottomSheetModalRef,
  handlePresentModalPress,
  data,
}) => {
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{flex: 1}}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['25%', '50%', '70%']}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.7}
            appearsOnIndex={1}
            disappearsOnIndex={-1}
          />
        )}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={{paddingBottom: hp('12%')}}>
            <View style={styles.header}>
              <Text style={[styles.headerText, {fontSize: wp('6.5%')}]}>
                Edit
              </Text>
              <Text style={[styles.headerTextColored, {fontSize: wp('6.5%')}]}>
                {' '}
                Data
              </Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.textForm}>Email</Text>
              <TextInputIzin
                placeholder="masukan email anda"
                value={email}
                onChangeText={setEmail}></TextInputIzin>
              <Text style={styles.textForm}>Telepon</Text>
              <TextInputIzin
                placeholder="ex : 089065432123"
                value={telepon}
                onChangeText={setTelepon}></TextInputIzin>
              <Text style={styles.textForm}>Alamat</Text>
              <TextInputIzin
                placeholder="ex : Jl. Ngesrep Timur 5, Sumurboto"
                value={alamat}
                onChangeText={setAlamat}></TextInputIzin>
              <Text style={styles.textForm}>Password</Text>
              <TextInputIzin
                placeholder="masukan password anda"
                value={password}
                onChangeText={setPassword}
                secureTextEntry></TextInputIzin>
              <ButtonIzin title="submit" onPress={() => {}}></ButtonIzin>
            </View>
          </View>
        </ScrollView>
      </BottomSheetModal>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
  },
  headerText: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  headerTextColored: {
    color: '#13A89D',
    fontFamily: 'Poppins-Bold',
  },
  form: {
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('7%'),
  },
  textForm: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp('3.5%'),
    color: '#000000',
  },
  contentText: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  rowContainer: {
    borderLeftColor: '#13A89D',
    borderLeftWidth: 5,
    alignItems: 'flex-start',
  },
  rowTouchable: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    justifyContent: 'space-between',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    marginLeft: 10,
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#13A89D',
    marginRight: 10,
  },
  rowText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  dropdown: {
    marginLeft: wp('10%'),
    overflow: 'hidden', // Ensure content does not spill out
  },
  dropdownText: {
    color: '#B8B8B8',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Regular',
  },
  scrollContent: {
    flexGrow: 1, // Allow ScrollView to grow and fill available space
  },
});

export default EditProfileBottomSheet;
