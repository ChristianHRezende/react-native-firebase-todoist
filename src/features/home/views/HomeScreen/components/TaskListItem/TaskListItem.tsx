import {Typography} from 'components';
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Task} from 'types/task';

type TaskListItemProps = {
  task: Task;
};

export const TaskListItem: React.FC<TaskListItemProps> = ({task}) => {
  const {title, description} = task;
  return (
    <View className={'border-2 border-white rounded flex-row'}>
      <View className={'flex-1 flex-column space-y-0.5'}>
        <Typography variant="5xl">{title}</Typography>
        <Typography variant="base">{description}</Typography>
      </View>
      <View className="items-center">
        <Icon name="ellipsis-v" />
      </View>
    </View>
  );
};
