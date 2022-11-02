import * as dayjs from "dayjs"

export function ageToDate(age) {
  let date = new Date()
  date.setFullYear(date.getFullYear() - age)
  date.setMonth(0)
  date.setDate(1)
  return date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
}

export function dateToAge(date) {
  if (!date) return ''
  const currentYear = new Date().getFullYear()
  const ageYear = new Date(`${date}T00:00:00.0000`).getFullYear()
  return currentYear - ageYear
}

export function getAge(date) {
  const date1 = dayjs(date)
  const date2 = dayjs()
  return date2.diff(date1, 'y')
}

export function displayBirthday(date) {
  var arrDate = date.split("-");
  return arrDate[1] + "/" + arrDate[2] + "/" + arrDate[0];
}

export function displayLinuxDate(linuxDate) {
  var arrDate = linuxDate.split("-");
  return arrDate[1] + "/" + arrDate[2] + "/" + arrDate[0];
}

export function formatBDayForAPI(bday) {
  let date = new Date(bday)
  return date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
}
