import {useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteTask,
  getTaskById,
  updateTask,
} from 'features/home/services/taskServices';
import {UpdateTaskParams} from 'features/home/services/types';
import {useToast} from 'react-native-toast-notifications';

interface UseTaskDetailsScreenProps {
  goBack: () => void;
  taskId?: string;
}
export function useTaskDetailsScreen({
  taskId,
  goBack,
}: UseTaskDetailsScreenProps) {
  const toast = useToast();
  const {data, isFetching, isLoading, refetch} = useQuery({
    queryFn: () => getTaskById(taskId ?? ''),
    queryKey: ['getTaskById', taskId],
    enabled: !!taskId,
  });

  const onDoneMt = useMutation({
    mutationFn: (params: UpdateTaskParams) => updateTask(params),
  });

  const onDeleteMt = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
  });

  function onDone() {
    if (!data) {
      return;
    }
    const {startDateTime, endDateTime, reminder, id, ...restParams} = data;
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
          refetch();
        },
        onError: () => {
          toast.show('failed on try fetch done');
        },
      },
    );
  }

  function onDelete() {
    if (!data) {
      return;
    }
    const {startDateTime, endDateTime, reminder, id, ...restParams} = data;
    onDeleteMt.mutateAsync(id, {
      onSuccess: () => {
        goBack();
        toast.show('Deleted');
      },
      onError: () => {
        toast.show('failed on try fetch done');
      },
    });
  }

  const loading = isFetching || isLoading;
  const isWritingLoading = onDoneMt.isPending || onDeleteMt.isPending;
  return {
    loading,
    isWritingLoading,
    data,
    onDone,
    onDelete,
  };
}
