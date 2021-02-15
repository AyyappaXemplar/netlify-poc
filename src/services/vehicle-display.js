export function vehicleTitle(vehicle) {
  const { year, manufacturer, model } = vehicle
  return `${year} ${manufacturer} ${model}`
}

export function vehicleInfoBody(t, vehicle, fullInfo) {
  const { vin, current_mileage, lienholder, use_code } = vehicle
  const useCode = t(`form.fields.use.useCode.${use_code.toLowerCase()}.label`)
  const additionalData = fullInfo ?`${vin} ${current_mileage}, ${lienholder && lienholder.name }` : ''
  return `${useCode} ${additionalData}`
}
