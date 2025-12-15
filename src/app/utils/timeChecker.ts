import moment from 'moment-timezone';

export const TIMEZONE = 'America/Los_Angeles';

export const isNowWithinTimeSlot = (
  date: string,
  timeSlot: string,
): boolean => {
  const [start, end] = timeSlot.split('-').map(t => t.trim());

  const startTime = moment
    .tz(`${date} ${start}`, 'YYYY-MM-DD hh:mm A', TIMEZONE)
    .toDate();

  const endTime = moment
    .tz(`${date} ${end}`, 'YYYY-MM-DD hh:mm A', TIMEZONE)
    .toDate();

  const now = moment().tz(TIMEZONE).toDate();

  return now >= startTime && now <= endTime;
};
