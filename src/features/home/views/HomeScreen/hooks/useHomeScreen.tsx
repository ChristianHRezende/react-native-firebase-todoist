import {useQuery} from '@tanstack/react-query';
import {searchTasks} from 'features/home/services/taskServices';
import {SearchTaskParams} from 'features/home/services/types';
import {useEffect, useTransition} from 'react';
import {useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';

export function useHomeScreen() {
  const toast = useToast();
  const {t} = useTranslation();
  const todoListParams: SearchTaskParams = {
    done: false,
  };
  const {data: todoTaskList, ...searchTodoTaskListData} = useQuery({
    queryKey: ['searchUndoneTaskQuery', todoListParams],
    queryFn: () => searchTasks(todoListParams),
  });

  const doneListParams: SearchTaskParams = {
    done: true,
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

  return {
    loading,
    error,
    todoTaskList: todoTaskList ?? [],
    doneTaskList: doneTaskList ?? [],
  };
}
