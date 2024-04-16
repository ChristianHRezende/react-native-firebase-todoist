import {Typography} from 'components';
import React from 'react';
import {PropsWithChildren} from 'react';

interface FormHelperTextProps extends PropsWithChildren {
  error?: boolean;
}

export const FormHelperText: React.FC<FormHelperTextProps> = ({
  error,
  children,
}) => {
  return (
    <Typography variant="sm" color={error ? 'error' : 'secondary'}>
      {children}
    </Typography>
  );
};
