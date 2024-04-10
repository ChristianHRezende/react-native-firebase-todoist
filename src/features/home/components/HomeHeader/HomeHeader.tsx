import UserImage from 'assets/images/user-face.png';
import {Typography} from 'components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as S from './HomeHeader.styled';

type HomeHeaderProps = {};

export const HomeHeader: React.FC<HomeHeaderProps> = ({}) => {
  const {t} = useTranslation();
  const toast = useToast();
  const handleDrawerButtonMenuPress = () => {
    toast.show('WIP');
  };

  return (
    <View className="bg-light-background dark:bg-dark-background w-screen flex-row justify-between items-center px-6">
      <TouchableOpacity onPress={handleDrawerButtonMenuPress}>
        <Icon name={'bars'} size={24} color={'#AAAAAA'} />
      </TouchableOpacity>
      <View className="flex-col justify-center space-y-0.5 w-48">
        <Typography customClassName="text-center">
          {`${t('home.header.title')}`}
        </Typography>
        <Typography variant="xs" color="gray" customClassName="text-center">
          {t('home.header.subtitle')}
        </Typography>
      </View>
      <S.UserImage source={UserImage} alt="User Image" />
    </View>
  );
};
