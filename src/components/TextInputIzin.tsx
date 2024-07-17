import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface TextInputIzinProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const TextInputIzin: React.FC<TextInputIzinProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: wp('0.5%'),
    height: hp('5.8%'),
    width: '100%',
    borderColor: '#ccc',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 1,
    elevation: 5,
    borderRadius: 5,
    marginBottom: hp('1%'),
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000000',
    fontWeight: '400',
    fontSize: wp('4%'),
    paddingLeft: wp('5%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2, // Adjust this value as needed
  },
});

export default TextInputIzin;
