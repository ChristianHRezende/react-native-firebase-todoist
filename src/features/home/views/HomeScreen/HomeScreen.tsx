import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Container, Typography} from 'components';
import React from 'react';
import {RootStackParamsList} from 'types/navigation';

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'Home'
>;

export const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <Container screen>
      <Typography>Home</Typography>
    </Container>
  );
};
