import {useMutation, useQuery} from '@tanstack/react-query';
import {
  createTask,
  getTaskById,
  updateTask,
} from 'features/home/services/taskServices';
import {
  CreateRequestTask,
  UpdateRequestTask,
} from 'features/home/services/types';
import {useEffect} from 'react';
import {UseFormReset} from 'react-hook-form';
import {FormData} from './types';

type useTaskFormScreenProps = {
  id: string | null;
  reset: UseFormReset<FormData>;
};

export default function useTaskFormScreen({id, reset}: useTaskFormScreenProps) {
  const {data, isFetching, isLoading} = useQuery({
    queryFn: () => getTaskById(id ?? ''),
    queryKey: ['getTaskById', id],
    enabled: !!id,
  });

  const loading = isFetching || isLoading;

  useEffect(() => {
    if (data?.id) {
      const {startDateTime, endDateTime, reminder, ...restData} = data;
      reset({
        ...restData,
        startDate: startDateTime.toDate(),
        startTime: startDateTime.toDate(),
        endDate: endDateTime.toDate(),
        endTime: endDateTime.toDate(),
        reminder: reminder.toDate(),
        reminderTime: reminder.toDate(),
      });
    }
  }, [data]);

  const createTaskMt = useMutation({
    mutationFn: (params: CreateRequestTask) => createTask(params),
  });

  const updateTaskMt = useMutation({
    mutationFn: (params: UpdateRequestTask) =>
      updateTask({id: id ?? '', data: params}),
  });

  return {
    loading,
    createTaskMt,
    updateTaskMt,
  };
}
