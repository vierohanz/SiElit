import * as React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

function login() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={tw`text-3xl text-black`}>login cuy</Text>
    </View>
  );
}

export default login;
