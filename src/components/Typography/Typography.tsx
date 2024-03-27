import {useThemeContext} from 'contexts/ThemeContext';
import React from 'react';
import {Text} from 'react-native';
import {TypographyProps} from './types';

export const Typography = ({
  color = 'base',
  heading = false,
  children,
  variant = 'base',
  customClassName = '',
}: TypographyProps) => {
  const {mode} = useThemeContext();

  function getTextColor() {
    if (!['base', 'background'].includes(color)) {
      return color;
    }
    return `${mode}-${color}`;
  }

  const fontWeight = heading ? 700 : 400;
  const classNames = `text-${variant} text-${getTextColor()} dark:text-${getTextColor()} font-[${fontWeight}] ${customClassName}`;

  return <Text className={classNames}>{children}</Text>;
};
