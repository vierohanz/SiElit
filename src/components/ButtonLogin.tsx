import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface ButtonLoginProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const ButtonLogin: React.FC<ButtonLoginProps> = ({
  title,
  onPress,
  loading,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
      {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#13A89D',
    marginTop: 30,
    paddingVertical: wp('2.8%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 5,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
    borderBottomLeftRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
  },
});

export default ButtonLogin;
