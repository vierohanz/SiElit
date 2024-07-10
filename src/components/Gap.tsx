import {View} from 'react-native';
import React from 'react';

type GapProps = {
  height?: number;
};
const Gap = ({height = 10}: GapProps) => {
  return <View style={{height: height}}></View>;
};

export default Gap;
