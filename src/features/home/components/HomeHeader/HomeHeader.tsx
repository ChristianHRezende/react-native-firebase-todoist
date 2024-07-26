import {signOut} from '@/services';
import UserImage from 'assets/images/user-face.png';
import {Typography} from '@/components';
import {useThemeContext} from '@/contexts/ThemeContext';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as S from './HomeHeader.styled';

type HomeHeaderVariant = 'menu' | 'back';

type HomeHeaderProps = {
  variant?: HomeHeaderVariant;
  navigation?: {
    goBack: () => void;
  };
  title?: string;
  subtitle?: string;
};

const ICONS = {
  menu: 'bars',
  back: 'arrow-left',
};

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  variant = 'back',
  navigation,
  title,
  subtitle,
}) => {
  const {t} = useTranslation();
  const {colors} = useThemeContext();
  const toast = useToast();
  const handleDrawerButtonMenuPress = () => {
    signOut();
  };
  const userImageHidden = variant !== 'menu';
  function handleBackPress() {
    navigation?.goBack?.();
  }

  const handleLeftButtonClick = {
    menu: handleDrawerButtonMenuPress,
    back: handleBackPress,
  }[variant];

  return (
    <View className="bg-light-background dark:bg-dark-background w-screen flex-row justify-between items-center px-6 pt-16">
      <TouchableOpacity onPress={handleLeftButtonClick}>
        <Icon name={ICONS[variant]} size={24} color={colors.gray} />
      </TouchableOpacity>
      <View className="flex-col justify-center space-y-0.5 w-48 items-center">
        <Typography customClassName="text-center">
          {title ?? `${t('home.header.title')}`}
        </Typography>
        {!title || !!subtitle ? (
          <Typography variant="xs" color="gray" customClassName="text-center">
            {!title ? t('home.header.subtitle') : subtitle}
          </Typography>
        ) : null}
      </View>
      <S.UserImage
        source={UserImage}
        alt="User Image"
        hidden={userImageHidden}
      />
    </View>
  );
};
