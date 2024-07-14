import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Searching = ({onSearch}: {onSearch: (text: string) => void}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <TextInput
      style={styles.textInput}
      placeholder="Cari"
      placeholderTextColor="#888"
      onChangeText={handleSearch}
      value={searchText}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: wp('5%'),
    position: 'absolute',
    bottom: -hp('3%'),
    left: wp('10%'),
    right: wp('10%'),
    height: hp('7%'),
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    color: '#000',
    fontSize: wp('4.5%'),
  },
});

export default Searching;
