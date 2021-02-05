import * as dayjs from 'dayjs';

const getDate = (timestamp) => {
  let date = dayjs.unix(timestamp).format('YYYY-MM-DD');
  return date;
};
export default getDate;

export const getTimestamp = (date) => {
  var timestamp = dayjs(date, 'YYYY-MM-DD').unix();
  return timestamp;
};

export const createDate = (modifier) => {
  if (modifier === 'tomorrow') {
    var timestamp = dayjs().add(1, 'day').unix()
  } else if (modifier === 'next month') {
    timestamp = dayjs().add(1, 'month').startOf('month').unix()
  } else if ('custom') {
      timestamp = dayjs(modifier).unix() || dayjs().unix();
  } else timestamp = dayjs().unix()
  return timestamp;
};

export const policyExpiry = (startDate, months) => {
  var expiry = dayjs.unix(startDate).add(`${months}`, 'month').unix()
  return expiry
}
