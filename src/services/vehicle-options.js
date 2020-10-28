function yearOptions() {
  let yearOptions = Array(20).fill()
  let currentYear = (new Date()).getFullYear()

  for (let index = 0; index <= 19; index++) {
    let option = currentYear - index
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
