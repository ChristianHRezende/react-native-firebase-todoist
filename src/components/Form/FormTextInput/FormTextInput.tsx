import {CustomTextInputProps, TextInput} from 'components';
import React from 'react';
import {View} from 'react-native';
import {FormHelperText} from '../FormHelperText';

interface FormTextInputProps extends CustomTextInputProps {
  helperText?: string;
}
export const FormTextInput = (props: FormTextInputProps) => {
  const {helperText, error, className, ...fieldProps} = props;

  return (
    <View className={className}>
      <TextInput {...fieldProps} error={error} />
      {helperText ? (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      ) : null}
    </View>
  );
};
