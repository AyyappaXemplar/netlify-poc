function yearOptions() {
  let yearOptions = Array(20).fill()
  let currentYear = (new Date).getFullYear()

  for (let index = 0; index <= 19; index++) {
    let option = currentYear - index
    console.log(option)
    yearOptions.fill(option, index, index + 1)
  }

  return yearOptions;
}

const vehicleOptions = {
  year: yearOptions().map((item, index) => {
   return {label: item, value: item}
  }),
  manufacturer: [],
  model: [],
  trim: []
}

export default vehicleOptions
