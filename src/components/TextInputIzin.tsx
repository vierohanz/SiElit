import React, {useState} from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface TextInputIzinProps extends TextInputProps {
  placeholder: string;
  value: string;
  secureTextEntry?: boolean;
}

const TextInputIzin: React.FC<TextInputIzinProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, {borderColor: isFocused ? '#13A89D' : '#ccc'}]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: wp('0.5%'),
    height: hp('6.8%'),
    width: '100%',
    borderColor: '#ccc',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderWidth: 2,
    elevation: 1,
    borderRadius: 5,
    marginBottom: hp('1%'),
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000000',
    fontWeight: '400',
    fontSize: wp('4.3%'),
    paddingLeft: wp('5%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default TextInputIzin;
