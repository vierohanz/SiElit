import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface UploadButtonProps {
  title: string;
  onPress: () => void;
  color: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({title, onPress, color}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: hp('4.5%'),
    width: wp('20%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('3%'),
    fontWeight: '600',
  },
});

export default UploadButton;
