import imgSource from 'assets/images/img.png';
import {Button, Container, Typography} from 'components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';

export const WelcomeScreen = ({}) => {
  const {t} = useTranslation();
  return (
    <Container screen>
      <Image source={imgSource} resizeMode="contain" className="w-full" />
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
      />
      <Button title={t('welcome.already.account')} />
    </Container>
  );
};
