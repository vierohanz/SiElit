import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface CheckboxRememberMeProps {
  checked: boolean;
  onChange: () => void;
}

const CheckboxRememberMe: React.FC<CheckboxRememberMeProps> = ({
  checked,
  onChange,
}) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
    <View style={[styles.checkbox, checked && styles.checked]}>
      {checked && (
        <Ionicons name="checkmark-sharp" size={wp('3%')} color="#fff" />
      )}
    </View>
    <Text style={styles.checkboxText}>Remember Me</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp('1%'),
  },
  checkbox: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center', // Center icon vertically
    alignItems: 'center', // Center icon horizontally
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#13A89D',
    borderColor: '#13A89D',
  },
  checkboxText: {
    color: '#999',
    fontSize: wp('4%'),
  },
});

export default CheckboxRememberMe;
