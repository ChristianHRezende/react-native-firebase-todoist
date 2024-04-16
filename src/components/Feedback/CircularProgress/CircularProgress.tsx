import React from 'react';
import {View} from 'react-native';
import {Circle} from 'react-native-progress';

interface CircularProgressProps {
  containerClassName?: string;
  circleClassName?: string;
}

export const CircularProgress = ({
  containerClassName,
  circleClassName,
}: CircularProgressProps) => (
  <View className={`${containerClassName}`}>
    <Circle
      size={30}
      indeterminate
      className={`self-center mt-2 ${circleClassName}`}
    />
  </View>
);
