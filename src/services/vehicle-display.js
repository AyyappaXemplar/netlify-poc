export function vehicleTitle(vehicle) {
  const { year, manufacturer, model } = vehicle
  return `${year} ${manufacturer} ${model}`
}

export function vehicleInfoBody(t, vehicle, fullInfo=false) {
  const { vin, current_mileage, lienholder, use_code } = vehicle
  const useCode = t(`form.fields.use.useCode.${use_code.toLowerCase()}.label`)
  const lienholderDisplay = lienholder ? `, ${lienholder.name}` : ''
  const mileage = `, ${current_mileage/1000} miles`
  const additionalData = fullInfo ? `${vin}${mileage}${lienholderDisplay}` : ''
  return `${useCode} ${additionalData}`
}
