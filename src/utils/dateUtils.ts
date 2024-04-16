import dayjs from 'dayjs';

export function buildDateTime(date: Date, time: Date) {
  return dayjs(
    `${date.toISOString().split('T')[0]}T${time.toISOString().split('T')[1]}`,
  ).toDate();
}
