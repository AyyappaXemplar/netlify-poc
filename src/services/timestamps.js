import * as dayjs from 'dayjs';

const getDate = (timestamp, format = 'YYYY-MM-DD') => dayjs.unix(timestamp).format(format)
export default getDate;

export const getTimestamp = (date) => dayjs(date, 'YYYY-MM-DD').unix();

export const policyExpiry = (startDate, months) => dayjs.unix(startDate).add(`${months}`, 'month').unix()
