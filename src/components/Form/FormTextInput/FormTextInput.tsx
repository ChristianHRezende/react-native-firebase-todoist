import {CustomTextInputProps, TextInput, Typography} from 'components';
import React from 'react';

interface FormTextInputProps extends CustomTextInputProps {
  helperText?: string;
}
export const FormTextInput = (props: FormTextInputProps) => {
  const {helperText, error, ...fieldProps} = props;

  return (
    <>
      <TextInput {...fieldProps} error={error} />
      {helperText ? (
        <Typography variant="sm" color={error ? 'error' : 'secondary'}>
          {helperText}
        </Typography>
      ) : null}
    </>
  );
};
