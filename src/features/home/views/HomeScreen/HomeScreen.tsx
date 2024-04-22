import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Container, Typography} from 'components';
import {HomeHeader} from 'features/home/components';
import {HomeBottomMenu} from 'features/home/components/HomeBottomMenu';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {RootStackParamsList} from 'types/navigation';
import {TaskList} from './components';
import {useHomeScreen} from './hooks/useHomeScreen';

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'Home'
>;

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {t} = useTranslation();
  const {navigate} = navigation;
  function handleAddTaskPress() {
    navigate('TaskForm');
  }

  const taskListData = useHomeScreen();

  return (
    <View>
      <HomeHeader variant="menu" />
      <Container screen>
        <Typography>{t('home.home')}</Typography>
        <TaskList {...taskListData} />
      </Container>
      <HomeBottomMenu onAddTaskPress={handleAddTaskPress} />
    </View>
  );
};
