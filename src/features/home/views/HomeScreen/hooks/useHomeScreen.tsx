import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import {searchTasks, updateTask} from 'features/home/services/taskServices';
import {SearchTaskParams, UpdateTaskParams} from 'features/home/services/types';
import {useCallback, useEffect, useState, useTransition} from 'react';
import {useSSR, useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';
import {FirebaseTask, Task} from 'types/task';

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

  const onDoneMt = useMutation({
    mutationFn: (params: UpdateTaskParams) => updateTask(params),
  });

  function onDone(task: FirebaseTask) {
    if (!task) {
      return;
    }
    const {startDateTime, endDateTime, reminder, id, ...restParams} = task;
    onDoneMt.mutateAsync(
      {
        id,
        data: {
          ...restParams,
          startDateTime: startDateTime.toDate(),
          endDateTime: endDateTime.toDate(),
          reminder: reminder.toDate(),
          done: !restParams.done,
        },
      },
      {
        onSuccess: () => {
          searchTodoTaskListData.refetch();
          searchDoneTaskListData.refetch();
        },
        onError: () => {
          toast.show('failed on try fetch done');
        },
      },
    );
  }

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

  useFocusEffect(
    useCallback(() => {
      /// MARK:  On Focus
      searchTodoTaskListData.refetch();
      searchDoneTaskListData.refetch();
      return () => {
        /// MARK:  On unfocus
      };
    }, []),
  );

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
    onDone,
  };
}
