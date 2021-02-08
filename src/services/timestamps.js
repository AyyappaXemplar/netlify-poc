import * as dayjs from 'dayjs';

const getDate = (timestamp) => dayjs.unix(timestamp).format('YYYY-MM-DD')
export default getDate;

export const getTimestamp = (date) => dayjs(date, 'YYYY-MM-DD').unix();

export const policyExpiry = (startDate, months) => dayjs.unix(startDate).add(`${months}`, 'month').unix()
