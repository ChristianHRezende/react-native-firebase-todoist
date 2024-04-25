import {CircularProgress, Typography} from 'components';
import React from 'react';
import {ButtonProps as RNButtonProps} from 'react-native';

import * as Styled from './Button.styles';
import {getButtonColor} from './colorSchema';
import {TypographyVariant} from 'components/Typography/types';

interface ButtonProps extends BaseComponentPropsWithChildren, RNButtonProps {
  variant?: 'contained' | 'text';
  color?: AppTheme.AppColorsType;
  customClassName?: string;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

const styledButtonSizes = {
  small: {container: 'h-8 w-24', fontVariant: 'sm'},
  medium: {container: 'h-8 w-24', fontVariant: '2xl'},
  large: {container: 'h-12 w-56', fontVariant: '2xl'},
};

export const Button = ({
  variant,
  color = 'primary',
  title = '',
  customClassName,
  size = 'large',
  disabled,
  loading,
  ...restProps
}: ButtonProps) => {
  const colorTheme = getButtonColor(disabled ? 'gray' : color);

  if (variant === 'contained') {
    const sizeButton = styledButtonSizes[size];
    const classNames = `${colorTheme} ${customClassName ?? ''} ${
      sizeButton.container ?? ''
    }`;
    return (
      <Styled.ContainedButton
        className={classNames}
        disabled={disabled}
        {...restProps}>
        {loading ? (
          <CircularProgress circleClassName="secondary" />
        ) : (
          <Typography
            color="background"
            variant={sizeButton.fontVariant as TypographyVariant}>
            {title}
          </Typography>
        )}
      </Styled.ContainedButton>
    );
  }

  return (
    <Styled.TextButton {...restProps}>
      {loading ? (
        <CircularProgress circleClassName="secondary" />
      ) : (
        <Typography color="primary" variant="2xl">
          {title}
        </Typography>
      )}
    </Styled.TextButton>
  );
};
