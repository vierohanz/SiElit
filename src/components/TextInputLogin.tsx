import React, {useState} from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface TextInputLoginProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const TextInputLogin: React.FC<TextInputLoginProps> = ({
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
      secureTextEntry={secureTextEntry}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: wp('2%'),
    height: hp('5.8%'),
    width: '80%',
    borderColor: '#ccc',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 1,
    elevation: 3,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    color: '#000000',
    fontWeight: '400',
    fontSize: wp('4%'),
    paddingLeft: wp('5%'),
  },
});

export default TextInputLogin;
