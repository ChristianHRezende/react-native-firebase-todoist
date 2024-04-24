import {useQuery} from '@tanstack/react-query';
import {searchTasks} from 'features/home/services/taskServices';
import {SearchTaskParams} from 'features/home/services/types';
import {useEffect, useState, useTransition} from 'react';
import {useSSR, useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';

export function useHomeScreen() {
  const toast = useToast();
  const {t} = useTranslation();
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

  return {
    loading,
    error,
    todoTaskList: todoTaskList ?? [],
    doneTaskList: doneTaskList ?? [],
    loadData,
  };
}
