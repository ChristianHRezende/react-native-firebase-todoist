import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Container, Typography} from 'components';
import {HomeHeader} from 'features/home/components';
import React from 'react';
import {View} from 'react-native';
import {RootStackParamsList} from 'types/navigation';

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'Home'
>;

export const HomeScreen = ({}: HomeScreenProps) => {
  return (
    <View>
      <HomeHeader />
      <Container screen>
        <Typography>Home</Typography>
      </Container>
    </View>
  );
};
