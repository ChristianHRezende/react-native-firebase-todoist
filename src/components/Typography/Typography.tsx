import React from 'react';
import {Text} from 'react-native';
import {TypographyProps} from './types';

import {getTextColor, getTextVariant} from './colorSchema';

export const Typography = ({
  color = 'base',
  heading = false,
  children,
  variant = 'base',
  customClassName = '',
}: TypographyProps) => {
  const colorTheme = getTextColor(color);
  const textVariant = getTextVariant(variant);
  const fontWeight = heading ? 'font-bold' : 'font-base';

  const classNames = [
    textVariant,
    colorTheme,
    fontWeight,
    customClassName,
  ].join(' ');

  return <Text className={classNames}>{children}</Text>;
};
