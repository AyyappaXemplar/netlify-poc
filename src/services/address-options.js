export default function setAddressOptions(data) {
  return data.counties.flatMap(county => {
    return county.cities.map(city => ({ zip_code: data.zip, state: data.state, county: county.name, city: city }))
  })
}
