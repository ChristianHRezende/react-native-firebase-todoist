import React from 'react';
import {FlatList, View} from 'react-native';
import * as styled from './TaskList.styled';
import {CircularProgress, Tabs, Typography} from 'components';
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
  navigate: (pageId: string, params: {id: string}) => void;
  onDone: (task: FirebaseTask) => void;
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
  navigate,
  onDone,
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

  function handlePressListItem(id: string) {
    navigate('TaskDetails', {id});
  }

  function handleOnDoneCheck(task: FirebaseTask) {
    onDone(task);
  }

  return (
    <View>
      <Typography variant="lg" customClassName="my-2">
        {t('task-list.title')}
      </Typography>
      <Tabs data={tabs} />
      {loading ? (
        <CircularProgress />
      ) : (
        <View>
          {selectedTab === TabEnum.TODO ? (
            <FlatList
              data={todoTaskList}
              keyExtractor={item => item.title + '-' + item.done}
              renderItem={({item}) => (
                <TaskListItem
                  task={item}
                  onPress={() => handlePressListItem(item.id)}
                  onCheck={() => handleOnDoneCheck(item)}
                />
              )}
              className="h-full"
              // onScrollEndDrag={() => loadData('todo')}
            />
          ) : null}
          {selectedTab === TabEnum.DONE ? (
            <FlatList
              data={doneTaskList}
              keyExtractor={item => item.title + '-' + item.done}
              renderItem={({item}) => (
                <TaskListItem
                  task={item}
                  onPress={() => handlePressListItem(item.id)}
                  onCheck={() => handleOnDoneCheck(item)}
                />
              )}
              className="h-full"
              onScrollEndDrag={() => loadData('done')}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};
