import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Container, Typography} from 'components';
import {HomeHeader} from 'features/home/components';
import {HomeBottomMenu} from 'features/home/components/HomeBottomMenu';
import React from 'react';
import {View} from 'react-native';
import {RootStackParamsList} from 'types/navigation';

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'Home'
>;

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {navigate} = navigation;
  function handleAddTaskPress() {
    navigate('TaskForm');
  }

  return (
    <View>
      <HomeHeader variant="menu" />
      <Container screen>
        <Typography>Home</Typography>
      </Container>
      <HomeBottomMenu onAddTaskPress={handleAddTaskPress} />
    </View>
  );
};
