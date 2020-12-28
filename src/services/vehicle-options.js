function yearOptions() {
  let currentDate = new Date()

  let currentMonth = currentDate.getMonth()
  let nextYearAvailable = currentMonth > 6
  let numYears =  nextYearAvailable ? 31 : 30

  let currentYear = currentDate.getFullYear()
  let startYear = nextYearAvailable ? currentYear + 1 : currentYear

  let yearOptions = Array(numYears).fill()
  for (let index = 0; index <= numYears; index++) {
    let option = startYear - index
    yearOptions.fill(option, index, index + 1)
  }

  return yearOptions;
}

const vehicleOptions = {
  year: yearOptions().map((item, index) => {
    item = item.toString();
    return {id: item, name: item}
  }),
  manufacturer: [],
  model: [],
  trim: []
}

export default vehicleOptions
