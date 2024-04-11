import React from 'react';

import * as Styled from './FloatButton.styles';
import {getButtonColor} from './colorSchema';
import {ButtonProps as RNButtonProps} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface IconButtonButtonProps extends Pick<RNButtonProps, 'onPress'> {
  color?: AppTheme.AppColorsType;
  action: 'Add';
  customClassName?: string;
}

const ICONS: Record<IconButtonButtonProps['action'], string> = {
  Add: 'plus',
};

export const FloatButton = ({
  color = 'primary',
  action = 'Add',
  customClassName,
  ...restProps
}: IconButtonButtonProps) => {
  const colorTheme = getButtonColor(color);
  const classNames = `${colorTheme} ${customClassName ?? ''}`;
  const iconName = ICONS[action];

  return (
    <Styled.ContainedButton className={classNames} {...restProps}>
      <Icon
        name={iconName}
        className="bg-light-background dark:bg-dark-background"
        size={21}
      />
    </Styled.ContainedButton>
  );
};
