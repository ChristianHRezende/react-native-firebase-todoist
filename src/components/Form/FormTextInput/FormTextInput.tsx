import {CustomTextInputProps, TextInput, Typography} from 'components';
import React from 'react';
import {View} from 'react-native';

interface FormTextInputProps extends CustomTextInputProps {
  helperText?: string;
}
export const FormTextInput = (props: FormTextInputProps) => {
  const {helperText, error, className, ...fieldProps} = props;

  return (
    <View className={className}>
      <TextInput {...fieldProps} error={error} />
      {helperText ? (
        <Typography variant="sm" color={error ? 'error' : 'secondary'}>
          {helperText}
        </Typography>
      ) : null}
    </View>
  );
};
