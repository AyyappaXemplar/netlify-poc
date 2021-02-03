import * as dayjs from 'dayjs';

const getDate = (timestamp) => {
  let date = dayjs(timestamp);
  date = date.format("YYYY-MM-DD");
    return date;
};
export default getDate;

export const getTimestamp = (date) => {
  var timestamp = Math.floor(dayjs(date).unix().format("x") / 1000);
  return timestamp;
};

export const createDate = (modifier) => {
  if (modifier === 'tomorrow') {
    var timestamp = dayjs().add(1, 'day').unix()
  } else if (modifier === 'next month') {
    var timestamp = dayjs().add(1, 'month').startOf('month').unix()
  } else {
    if (dayjs(modifier).unix() > dayjs()) {
      var timestamp = dayjs(modifier).unix()
    } else {timestamp = null}
  }
  return timestamp;
};
