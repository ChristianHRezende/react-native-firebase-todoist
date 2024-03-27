import imgSource from 'assets/images/img.png';
import {Container, Typography} from 'components';
import React from 'react';
import {Image} from 'react-native';

type Props = {};

export const WelcomeScreen: React.FC<Props> = ({}) => {
  return (
    <Container screen>
      <Image source={imgSource} resizeMode="contain" className="w-full" />
      <Typography
        variant="3xl"
        heading
        customClassName="max-w-[266] self-center text-center ">
        Let's Organize Your Node TODO
      </Typography>
    </Container>
  );
};
