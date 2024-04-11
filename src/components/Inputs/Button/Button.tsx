import {Typography} from 'components';
import React from 'react';
import {ButtonProps as RNButtonProps} from 'react-native';

import * as Styled from './Button.styles';
import {getButtonColor} from './colorSchema';

interface ButtonProps extends BaseComponentPropsWithChildren, RNButtonProps {
  variant?: 'contained' | 'text';
  color?: AppTheme.AppColorsType;
  customClassName?: string;
}

export const Button = ({
  variant,
  color = 'primary',
  title = '',
  customClassName,
  ...restProps
}: ButtonProps) => {
  const colorTheme = getButtonColor(color);

  if (variant === 'contained') {
    const classNames = `${colorTheme} ${customClassName ?? ''}`;

    return (
      <Styled.ContainedButton className={classNames} {...restProps}>
        <Typography color="background" variant="2xl">
          {title}
        </Typography>
      </Styled.ContainedButton>
    );
  }

  return (
    <Styled.TextButton {...restProps}>
      <Typography color="primary" variant="2xl">
        {title}
      </Typography>
    </Styled.TextButton>
  );
};
