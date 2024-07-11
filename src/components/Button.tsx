import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

type ButtonProps = {
  width?: number;
  height?: number;
  textbutton?: string;
  onPress?: any;
};

const Button = ({
  width = 131,
  height = 45,
  textbutton = 'Submit',
  onPress,
}: ButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          {width: width, height: height},
          styles.button,
          styles.elevation,
          styles.shadowP,
        ]}
        onPress={onPress}>
        <Text style={styles.textbutton}>{textbutton}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#13A89D',
    // height: 45,
    // width: 131,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  shadowP: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  elevation: {
    elevation: 10,
    shadowColor: '#000000',
  },
  textbutton: {fontFamily: 'Poppins-SemiBold', color: '#FFFFFF'},
});
