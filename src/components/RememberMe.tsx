import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface CheckboxRememberMeProps {
  checked: boolean;
  onChange: () => void;
}

const CheckboxRememberMe: React.FC<CheckboxRememberMeProps> = ({
  checked,
  onChange,
}) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
    <View style={[styles.checkbox, checked && styles.checked]} />
    <Text style={styles.checkboxText}>Remember Me</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#13A89D',
    borderColor: '#13A89D',
  },
  checkboxText: {
    color: '#999',
  },
});

export default CheckboxRememberMe;
