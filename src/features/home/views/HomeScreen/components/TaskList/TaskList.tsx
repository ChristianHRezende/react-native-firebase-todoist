import React from 'react';
import {FlatList, View} from 'react-native';
import * as styled from './TaskList.styled';
import {Tabs, Typography} from 'components';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {FirebaseTask, Task} from 'types/task';
import {TaskListItem} from '../TaskListItem';
interface TaskListProps {
  loading: boolean;
  error: boolean;
  todoTaskList: FirebaseTask[];
  doneTaskList: FirebaseTask[];
  loadData: (type: 'todo' | 'done') => void;
}

enum TabEnum {
  TODO = 0,
  DONE = 1,
}
export const TaskList: React.FC<TaskListProps> = ({
  loading,
  todoTaskList,
  doneTaskList,
  loadData,
}) => {
  const {t} = useTranslation();
  const [selectedTab, setSelectedTab] = useState<TabEnum>(TabEnum.TODO);
  const tabs = [
    {
      title: t('todo'),
      selected: selectedTab === TabEnum.TODO,
      onPress: () => setSelectedTab(TabEnum.TODO),
    },
    {
      title: t('done'),
      selected: selectedTab === TabEnum.DONE,
      onPress: () => setSelectedTab(TabEnum.DONE),
    },
  ];

  return (
    <View>
      <Typography variant="lg" customClassName="my-2">
        {t('task-list.title')}
      </Typography>
      <Tabs data={tabs} />
      {selectedTab === TabEnum.TODO ? (
        <FlatList
          data={todoTaskList}
          renderItem={({item}) => <TaskListItem task={item} />}
          className="h-full"
          onScrollEndDrag={() => loadData('todo')}
        />
      ) : null}
      {selectedTab === TabEnum.DONE ? (
        <FlatList
          data={doneTaskList}
          renderItem={({item}) => <TaskListItem task={item} />}
          className="h-full"
          onScrollEndDrag={() => loadData('done')}
        />
      ) : null}
    </View>
  );
};
