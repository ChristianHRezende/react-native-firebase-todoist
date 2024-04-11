import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Container, Typography} from 'components';
import {HomeHeader} from 'features/home/components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {RootStackParamsList} from 'types/navigation';

export type TaskFormScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'TaskForm'
>;

export const TaskFormScreen = ({navigation}: TaskFormScreenProps) => {
  const {t} = useTranslation();
  return (
    <View>
      <HomeHeader
        variant="back"
        navigation={navigation}
        title={t('add.task.header.title')}
      />
      <Container screen>
        <Typography>Task Form</Typography>
      </Container>
    </View>
  );
};
