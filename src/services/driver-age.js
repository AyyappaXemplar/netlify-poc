export function ageToDate(age) {
  let date = new Date()
  date.setFullYear(date.getFullYear() - age)
  date.setMonth(0)
  date.setDate(1)
  return date.toISOString()
}

export function dateToAge(date) {
  if (!date) return ''
  const currentYear = new Date().getFullYear()
  const ageYear = new Date(`${date}T00:00:00.0000`).getFullYear()
  return currentYear - ageYear
}
