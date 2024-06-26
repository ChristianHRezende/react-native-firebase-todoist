import {Typography} from 'components';
import {useThemeContext} from 'contexts/ThemeContext';
import dayjs from 'dayjs';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FirebaseTask, Task} from 'types/task';
import {truncateString} from 'utils';

type TaskListItemProps = {
  task: FirebaseTask;
  onPress: () => void;
  onCheck: () => void;
};

export const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onPress,
  onCheck,
}) => {
  const {colors} = useThemeContext();
  const {title, description, reminder, done} = task;

  const reminderDataFormatted = reminder
    ? dayjs(reminder.toDate()).format('dddd,D MMM YYYY')
    : null;
  const reminderHourFormatted = reminder
    ? dayjs(reminder.toDate()).format('hh.mm a')
    : null;

  return (
    <View
      className={
        'border-0.5 border-white rounded-2xl flex-row px-6 py-4 mb-2.5 justify-between'
      }>
      <TouchableOpacity onPress={onPress}>
        <View className={'flex-1 flex-column space-y-1.5'}>
          <Typography variant="3xl">{truncateString(title, 20)}</Typography>
          <Typography variant="sm" customClassName="mt-1">
            {truncateString(description, 30)}
          </Typography>
          <View className="flex-row justify-start items-center space-x-4 pl-0.5">
            <View className="flex-row">
              {reminderDataFormatted ? (
                <Icon name="calendar" color={colors.base} size={16} />
              ) : null}
              <Typography variant="sm" customClassName="ml-1">
                {reminderDataFormatted ?? ' '}
              </Typography>
            </View>
            <View className="flex-row">
              {reminderDataFormatted ? (
                <Icon name="clock" color={colors.base} size={16} />
              ) : null}
              <Typography variant="sm" customClassName="ml-1">
                {reminderHourFormatted ?? ' '}
              </Typography>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View className="items-center justify-center">
        <TouchableOpacity onPress={onCheck}>
          <Icon
            name={done ? 'check-circle' : 'circle'}
            color={colors.base}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
