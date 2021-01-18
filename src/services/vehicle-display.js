export function vehicleTitle(vehicle) {
  const { year, manufacturer, model } = vehicle
  return `${year} ${manufacturer} ${model}`
}
