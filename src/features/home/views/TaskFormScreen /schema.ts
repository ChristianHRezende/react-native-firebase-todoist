import dayjs from 'dayjs';
import {t} from 'i18next';
import {TaskPriority} from 'types/task';
import {z} from 'zod';

const shema = z.object({
  title: z.string().min(1, t('error.validation.min')),
  description: z.string().min(1, t('error.validation.min')),
  startDate: z.date().min(dayjs().toDate(), t('error.validation.min')),
  startTime: z.date().min(dayjs().toDate(), t('error.validation.min')),
  endDate: z.date().min(dayjs().toDate(), t('error.validation.min')),
  endTime: z.date().min(dayjs().toDate(), t('error.validation.min')),
  priority: z.nativeEnum(TaskPriority),
  reminder: z.date().min(dayjs().toDate(), t('error.validation.min')),
  reminderTime: z.date().min(dayjs().toDate(), t('error.validation.min')),
  done: z.boolean(),
});

export default shema;
