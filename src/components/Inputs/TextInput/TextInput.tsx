import {useThemeContext} from 'contexts/ThemeContext';
import React from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {CustomTextInputProps} from './types';

export const TextInput = ({error, ...props}: CustomTextInputProps) => {
  const {colors} = useThemeContext();
  const borderColor = error ? 'border-error' : 'border-blue-300';
  return (
    <RNTextInput
      className={`text-light-base dark:text-dark-base dark:bg-gray-700 border-solid border-b-2 ${borderColor} rounded py-2 px-1`}
      placeholderTextColor={colors.base}
      {...props}
    />
  );
};
