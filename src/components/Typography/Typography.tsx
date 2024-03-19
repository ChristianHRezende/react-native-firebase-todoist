import React from 'react';
import {Text} from 'react-native';
import {TypographyProps} from './types';

export const Typography = ({
  color = 'text',
  heading = false,
  children,
  variant = 'base',
  className,
}: TypographyProps) => {
  const fontWeight = heading ? 'bold' : 'normal';
  const baseClassNames = `font-spartan text-${variant} text-${color} dark:text=${color} font-${fontWeight}`;

  return (
    <Text className={[baseClassNames, className].join(' ')}>{children}</Text>
  );
};
