import {useQuery} from '@tanstack/react-query';
import {searchTasks} from 'features/home/services/taskServices';
import {SearchTaskParams} from 'features/home/services/types';
import {t} from 'i18next';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useToast} from 'react-native-toast-notifications';
import {FirebaseTask} from 'types/task';

interface TaskContextValues {
  loading: boolean;
  error: boolean;
  todoTaskList: FirebaseTask[];
  doneTaskList: FirebaseTask[];
  loadData: (type: 'todo' | 'done') => void;
}

const TaskContext = createContext<TaskContextValues>({} as TaskContextValues);

export const TaskContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const toast = useToast();
  const [todoLimit, setTodoLimit] = useState(10);
  const [doneLimit, setDoneLimit] = useState(10);

  const todoListParams: SearchTaskParams = {
    done: false,
    limit: todoLimit,
  };
  const {data: todoTaskList, ...searchTodoTaskListData} = useQuery({
    queryKey: ['searchUndoneTaskQuery', todoListParams],
    queryFn: () => searchTasks(todoListParams),
  });

  const doneListParams: SearchTaskParams = {
    done: true,
    limit: doneLimit,
  };
  const {data: doneTaskList, ...searchDoneTaskListData} = useQuery({
    queryKey: ['searchDoneTaskQuery', doneListParams],
    queryFn: () => searchTasks(doneListParams),
  });

  const error =
    searchTodoTaskListData.isError || searchDoneTaskListData.isError;

  const loading =
    searchTodoTaskListData.isLoading ||
    searchTodoTaskListData.isFetching ||
    searchDoneTaskListData.isLoading ||
    searchDoneTaskListData.isFetching;

  useEffect(() => {
    if (error) {
      toast.show(t('error.list.task'), {type: 'error'});
    }
  }, [error]);

  function loadData(type: 'todo' | 'done') {
    if (type === 'done') {
      setTodoLimit(oldProps => oldProps + 10);
      return;
    }
    setDoneLimit(oldProps => oldProps + 10);
  }

  return (
    <TaskContext.Provider
      value={{
        loading,
        error,
        todoTaskList: todoTaskList ?? [],
        doneTaskList: doneTaskList ?? [],
        loadData,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

export default function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("It's necessary a Task Provider");
  }
  return context;
}
