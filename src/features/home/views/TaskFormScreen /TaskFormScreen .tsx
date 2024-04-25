import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Button,
  CircularProgress,
  Container,
  FormButtonsListSelector,
  FormContainer,
  FormDateTimePicker,
  FormTextInput,
  Typography,
} from 'components';
import dayjs from 'dayjs';
import {HomeHeader} from 'features/home/components';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {RootStackParamsList} from 'types/navigation';
import {TaskPriority} from 'types/task';
import {buildDateTime} from 'utils/dateUtils';
import schema from './schema';
import {FormData} from './types';
import useTaskFormScreen from './useTaskFormScreen';

export type TaskFormScreenProps = NativeStackScreenProps<
  RootStackParamsList,
  'TaskForm'
>;

export const TaskFormScreen = ({navigation, route}: TaskFormScreenProps) => {
  const id = route.params?.id ?? null;
  const {t} = useTranslation();
  const toast = useToast();

  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      startDate: dayjs().toDate(),
      startTime: dayjs().toDate(),
      endDate: dayjs().toDate(),
      endTime: dayjs().toDate(),
      priority: TaskPriority.HIGH,
      reminder: dayjs().toDate(),
      reminderTime: dayjs().toDate(),
      done: false,
    },
  });
  const watchStartDate = watch('startDate');
  const {loading, createTaskMt, updateTaskMt} = useTaskFormScreen({id, reset});

  const submit = handleSubmit(values => {
    const {
      startDate,
      startTime,
      endDate,
      endTime,
      reminder,
      reminderTime,
      ...restValues
    } = values;

    const body = {
      ...restValues,
      startDateTime: buildDateTime(startDate, startTime),
      endDateTime: buildDateTime(endDate, endTime),
      reminder: buildDateTime(reminder, reminderTime),
    };

    const requestMt = id ? updateTaskMt : createTaskMt;

    requestMt.mutateAsync(body, {
      onSuccess: () => {
        toast.show(t('success'));
        navigation.goBack();
      },
      onError: () => {
        toast.show(t('error.form.wrong.data'), {
          type: 'error',
        });
      },
    });
  });

  return (
    <View>
      <HomeHeader
        variant="back"
        navigation={navigation}
        title={t('add.task.header.title')}
      />
      <Container screen>
        <FormContainer title={t('select.date')}>
          <Typography>{t('from')}</Typography>
          <View className="flex-row justify-end">
            <Controller
              name="startDate"
              control={control}
              render={({field: {onChange, ref, ...restFieldProps}}) => (
                <FormDateTimePicker
                  disabled={loading}
                  onChange={(_, date) => {
                    onChange(date);
                  }}
                  minimumDate={dayjs().toDate()}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                  {...restFieldProps}
                />
              )}
            />
            <Controller
              name="startTime"
              control={control}
              render={({field: {onChange, ref, ...restFieldProps}}) => (
                <FormDateTimePicker
                  disabled={loading}
                  mode="time"
                  onChange={(_, date) => {
                    onChange(date);
                  }}
                  error={!!errors.startTime}
                  helperText={errors.startTime?.message}
                  {...restFieldProps}
                />
              )}
            />
          </View>

          <Typography>{t('to')}</Typography>
          <View className="flex-row justify-end">
            <Controller
              name="endDate"
              control={control}
              render={({field: {onChange, ref, ...restFieldProps}}) => (
                <FormDateTimePicker
                  disabled={loading}
                  onChange={(_, date) => {
                    onChange(date);
                  }}
                  minimumDate={watchStartDate}
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                  {...restFieldProps}
                />
              )}
            />
            <Controller
              name="endTime"
              control={control}
              render={({field: {onChange, ref, ...restFieldProps}}) => (
                <FormDateTimePicker
                  disabled={loading}
                  mode="time"
                  onChange={(_, date) => {
                    onChange(date);
                  }}
                  error={!!errors.endTime}
                  helperText={errors.endTime?.message}
                  {...restFieldProps}
                />
              )}
            />
          </View>
        </FormContainer>
        <FormContainer title={t('priority')}>
          <Controller
            name="priority"
            control={control}
            render={({field: {onChange, value}}) => {
              function handlePriorityPress(priority: TaskPriority) {
                onChange(priority);
              }
              return (
                <FormButtonsListSelector
                  loading={loading}
                  data={[
                    {
                      title: t('high'),
                      color: 'error',
                      onPress: () => handlePriorityPress(TaskPriority.HIGH),
                      disabled: value === TaskPriority.HIGH || loading,
                    },
                    {
                      title: t('medium'),
                      color: 'primary',
                      onPress: () => handlePriorityPress(TaskPriority.MEDIUM),
                      disabled: value === TaskPriority.MEDIUM || loading,
                    },
                    {
                      title: t('low'),
                      color: 'error',
                      onPress: () => handlePriorityPress(TaskPriority.LOW),
                      disabled: value === TaskPriority.LOW || loading,
                    },
                  ]}
                />
              );
            }}
          />
        </FormContainer>
        <FormContainer title={t('reminder')}>
          <Typography>{t('at')}</Typography>
          <View className="flex-row justify-end">
            <Controller
              name="reminder"
              control={control}
              render={({field: {onChange, ref, ...restFieldProps}}) => (
                <FormDateTimePicker
                  disabled={loading}
                  onChange={(_, date) => {
                    onChange(date);
                  }}
                  error={!!errors.reminder}
                  helperText={errors.reminder?.message}
                  {...restFieldProps}
                />
              )}
            />
            <Controller
              name="reminderTime"
              control={control}
              render={({field: {onChange, ref, ...restFieldProps}}) => (
                <FormDateTimePicker
                  disabled={loading}
                  mode="time"
                  onChange={(_, date) => {
                    onChange(date);
                  }}
                  error={!!errors.reminderTime}
                  helperText={errors.reminderTime?.message}
                  {...restFieldProps}
                />
              )}
            />
          </View>
        </FormContainer>
        <FormContainer title={t('Note')}>
          <Typography customClassName="mt-0.5 mb-0.5">{t('title')}</Typography>
          <Controller
            name="title"
            control={control}
            render={({field: {ref, ...restFieldProps}}) => (
              <FormTextInput
                {...restFieldProps}
                disabled={loading}
                onChangeText={restFieldProps.onChange}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Typography customClassName="mt-2 mb-0.5">
            {t('description')}
          </Typography>
          <Controller
            name="description"
            control={control}
            render={({field: {ref, ...restFieldProps}}) => (
              <FormTextInput
                {...restFieldProps}
                disabled={loading}
                onChangeText={restFieldProps.onChange}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </FormContainer>
        {createTaskMt.isPending ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            title={t('submit')}
            customClassName="self-center mt-2"
            onPress={submit}
          />
        )}
      </Container>
    </View>
  );
};
