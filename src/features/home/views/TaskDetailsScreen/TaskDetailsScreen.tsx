import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  CircularProgress,
  Container,
  FormContainer,
  Typography,
} from 'components';
import dayjs from 'dayjs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {RootStackParamsList} from 'types/navigation';
import {useTaskDetailsScreen} from './hooks';
import {HomeHeader} from 'features/home/components';

export type TaskFormScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'TaskDetails'
>;
export const TaskDetailsScreen: React.FC<TaskFormScreenProps> = ({
  navigation,
  route,
}) => {
  const {t} = useTranslation();
  const {goBack} = navigation;
  const id = route.params.id;
  const toast = useToast();
  const {data, loading, isWritingLoading, onDone, onDelete} =
    useTaskDetailsScreen({
      taskId: id,
      goBack: navigation.goBack,
    });
  if (loading || data === undefined) {
    return (
      <Container screen>
        <CircularProgress />
      </Container>
    );
  }
  if (!data) {
    toast.show('failed on try get details', {type: 'error'});
    goBack();
    return null;
  }

  const {
    title,
    description,
    startDateTime,
    endDateTime,
    priority,
    reminder,
    isReminded,
    done,
  } = data;

  return (
    <View>
      <HomeHeader navigation={navigation} title={title} />
      <Container screen>
        <ScrollView>
          <View>
            <View className="flex-row justify-between ">
              <FormContainer title={t('priority')} customClassName="w-5/12">
                <Typography>
                  {t(`${priority.toLowerCase()}`).toLocaleLowerCase()}
                </Typography>
              </FormContainer>
              <FormContainer title={t('done')} customClassName="w-5/12">
                <Typography>{done ? t('done') : t('todo')}</Typography>
              </FormContainer>
            </View>
            <FormContainer title={t('description')}>
              <Typography>{description}</Typography>
            </FormContainer>
            <FormContainer title={t('startDateTime')}>
              <Typography>
                {dayjs(startDateTime.toDate()).format('DD/MM/YYYY HH:mm')}
              </Typography>
            </FormContainer>
            <FormContainer title={t('endDateTime')}>
              <Typography>
                {dayjs(endDateTime.toDate()).format('DD/MM/YYYY HH:mm')}
              </Typography>
            </FormContainer>
            <FormContainer title={t('reminder')}>
              <Typography>
                {dayjs(reminder.toDate()).format('DD/MM/YYYY HH:mm')}
              </Typography>
              <Typography>
                {isReminded ? t('reminded') : t('not.reminded')}
              </Typography>
            </FormContainer>
          </View>
          <Button
            variant="contained"
            title="Done"
            customClassName="self-center mb-6 mt-4 w-4/5"
            onPress={onDone}
            loading={isWritingLoading}
          />
          <Button
            title="Delete"
            customClassName="self-center w-4/5"
            onPress={onDelete}
            loading={isWritingLoading}
          />
        </ScrollView>
      </Container>
    </View>
  );
};
