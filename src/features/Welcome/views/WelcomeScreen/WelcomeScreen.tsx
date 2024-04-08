import {NativeStackScreenProps} from '@react-navigation/native-stack';

import imgSource from 'assets/images/img.png';
import {Button, Container, Typography} from 'components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import {RootStackParamsList} from 'types/navigation';

type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'Welcome'
>;

export const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  const {t} = useTranslation();
  const {navigate} = navigation;

  return (
    <Container screen viewClassname="flex-col space-y-8">
      <Image source={imgSource} resizeMode="contain" className="w-full mt-12" />
      <Typography
        variant="3xl"
        heading
        customClassName="max-w-[266] self-center text-center">
        {t('welcome.title')}
      </Typography>
      <Typography customClassName="max-w-[286] self-center text-center ">
        {t('welcome.message')}
      </Typography>
      <Button
        variant="contained"
        title={t('get.started')}
        customClassName="self-center"
        onPress={() => {
          navigate('SignUp');
        }}
      />
      <Button title={t('welcome.already.account')} />
    </Container>
  );
};
