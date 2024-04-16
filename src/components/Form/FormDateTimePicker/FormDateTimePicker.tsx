import DateTimePicker, {
  IOSNativeProps,
  AndroidNativeProps,
  WindowsNativeProps,
} from '@react-native-community/datetimepicker';
import React from 'react';
import {View} from 'react-native';
import {FormHelperText} from '../FormHelperText';

type FormDateTimePickerProps = IOSNativeProps &
  AndroidNativeProps &
  WindowsNativeProps & {
    helperText?: string;
    error?: boolean;
    className?: string;
  };

export const FormDateTimePicker = (props: FormDateTimePickerProps) => {
  const {helperText, error, className, ...fieldProps} = props;

  return (
    <View className={className}>
      <DateTimePicker {...fieldProps} />
      {helperText ? (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      ) : null}
    </View>
  );
};
