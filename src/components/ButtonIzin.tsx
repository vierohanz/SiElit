import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonIzinProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

const ButtonIzin: React.FC<ButtonIzinProps> = ({title, onPress, ...rest}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: wp('30%'),
    backgroundColor: '#13A89D',
    marginTop: 25,
    paddingVertical: wp('2.8%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 5,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
    borderBottomLeftRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});

export default ButtonIzin;
