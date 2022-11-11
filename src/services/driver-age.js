export function ageToDate(age) {
  let date = new Date()
  date.setFullYear(date.getFullYear() - age)
  date.setMonth(date.getMonth())
  date.setDate(date.getDate())
  return date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
}

export function dateToAge(date) {
  if (!date) return ''
  var diff_ms = Date.now() - new Date(date).getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export function displayBirthday(date) {
  var arrDate = date.includes('/') ? date.split("/") : date.split("-");
  return arrDate[1] + "/" + arrDate[2] + "/" + arrDate[0];
}

export function displayLinuxDate(linuxDate) {
  var arrDate = linuxDate.includes('/') ? linuxDate.split("/") : linuxDate.split("-");
  return arrDate[1] + "/" + arrDate[2] + "/" + arrDate[0];
}

export function formatBDayForAPI(bday) {
  let date = new Date(`${bday}`)
  return date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
}
