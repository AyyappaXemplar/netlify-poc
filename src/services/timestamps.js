import moment from "moment";

const getDate = (timestamp) => {
  let date = moment.unix(timestamp);
  date = date.format("YYYY-MM-DD");
  return date;
};
export default getDate;

export const getTimestamp = (date) => {
  var timestamp = Math.floor(moment(date).format("x") / 1000);
  return timestamp;
};
