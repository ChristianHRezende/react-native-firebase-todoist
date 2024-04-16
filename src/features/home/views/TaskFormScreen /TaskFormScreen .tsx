import {zodResolver} from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  Button,
  Container,
  FormContainer,
  FormHelperText,
  FormTextInput,
  Typography,
} from 'components';
import dayjs from 'dayjs';
import {HomeHeader} from 'features/home/components';
import {
  createTask,
  getTaskById,
  updateTask,
} from 'features/home/services/taskServices';
import {
  CreateRequestTask,
  UpdateRequestTask,
} from 'features/home/services/types';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Circle} from 'react-native-progress';
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
  const {id = null} = route.params;
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
              render={({field: {onChange, ...restFieldProps}}) => (
                <View>
                  <DateTimePicker
                    disabled={loading}
                    onChange={(_, date) => {
                      onChange(date);
                    }}
                    minimumDate={dayjs().toDate()}
                    {...restFieldProps}
                  />
                  {errors.startDate ? (
                    <FormHelperText error={!!errors.startDate}>
                      {errors.startDate.message}
                    </FormHelperText>
                  ) : null}
                </View>
              )}
            />
            <Controller
              name="startTime"
              control={control}
              render={({field: {onChange, ...restFieldProps}}) => (
                <View>
                  <DateTimePicker
                    disabled={loading}
                    mode="time"
                    onChange={(_, date) => {
                      onChange(date);
                    }}
                    {...restFieldProps}
                  />
                  {errors.startTime ? (
                    <FormHelperText error={!!errors.startTime}>
                      {errors.startTime.message}
                    </FormHelperText>
                  ) : null}
                </View>
              )}
            />
          </View>

          <Typography>{t('to')}</Typography>
          <View className="flex-row justify-end">
            <Controller
              name="endDate"
              control={control}
              render={({field: {onChange, ...restFieldProps}}) => (
                <View>
                  <DateTimePicker
                    disabled={loading}
                    onChange={(_, date) => {
                      onChange(date);
                    }}
                    minimumDate={watchStartDate}
                    {...restFieldProps}
                  />
                  {errors.endDate ? (
                    <FormHelperText error={!!errors.endDate}>
                      {errors.endDate.message}
                    </FormHelperText>
                  ) : null}
                </View>
              )}
            />
            <Controller
              name="endTime"
              control={control}
              render={({field: {onChange, ...restFieldProps}}) => (
                <View>
                  <DateTimePicker
                    disabled={loading}
                    mode="time"
                    onChange={(_, date) => {
                      onChange(date);
                    }}
                    {...restFieldProps}
                  />
                  {errors.endTime ? (
                    <FormHelperText error={!!errors.endTime}>
                      {errors.endTime.message}
                    </FormHelperText>
                  ) : null}
                </View>
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
                <View className="flex-row justify-between items-center">
                  <Button
                    size="small"
                    title={t('high')}
                    variant="contained"
                    color="error"
                    onPress={() => handlePriorityPress(TaskPriority.HIGH)}
                    disabled={value === TaskPriority.HIGH || loading}
                  />
                  <Button
                    size="small"
                    title={t('medium')}
                    variant="contained"
                    color="primary"
                    onPress={() => handlePriorityPress(TaskPriority.MEDIUM)}
                    disabled={value === TaskPriority.MEDIUM || loading}
                  />
                  <Button
                    size="small"
                    title={t('low')}
                    variant="contained"
                    color="success"
                    onPress={() => handlePriorityPress(TaskPriority.LOW)}
                    disabled={value === TaskPriority.LOW || loading}
                  />
                </View>
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
              render={({field}) => (
                <View>
                  <DateTimePicker disabled={loading} {...field} />
                  {errors.reminder ? (
                    <FormHelperText error={!!errors.reminder}>
                      {errors.reminder.message}
                    </FormHelperText>
                  ) : null}
                </View>
              )}
            />
            <Controller
              name="reminderTime"
              control={control}
              render={({field: {onChange, ...restFieldProps}}) => (
                <View>
                  <DateTimePicker
                    disabled={loading}
                    mode="time"
                    onChange={(_, date) => {
                      onChange(date);
                    }}
                    {...restFieldProps}
                  />
                  {errors.reminderTime ? (
                    <FormHelperText error={!!errors.reminderTime}>
                      {errors.reminderTime.message}
                    </FormHelperText>
                  ) : null}
                </View>
              )}
            />
          </View>
        </FormContainer>
        <FormContainer title={t('Note')}>
          <Typography customClassName="mt-0.5 mb-0.5">{t('title')}</Typography>
          <Controller
            name="title"
            control={control}
            render={({field}) => (
              <FormTextInput
                {...field}
                disabled={loading}
                onChangeText={field.onChange}
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
            render={({field}) => (
              <FormTextInput
                {...field}
                disabled={loading}
                onChangeText={field.onChange}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </FormContainer>
        {createTaskMt.isPending ? (
          <Circle size={30} indeterminate className="self-center mt-2" />
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
