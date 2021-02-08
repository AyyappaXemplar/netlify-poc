import * as dayjs from 'dayjs';

const getDate = (timestamp) => {
  let date = dayjs.unix(timestamp).format('YYYY-MM-DD');
  return date;
};
export default getDate;

export const getTimestamp = (date) => dayjs(date, 'YYYY-MM-DD').unix();

export const policyExpiry = (startDate, months) => dayjs.unix(startDate).add(`${months}`, 'month').unix()
