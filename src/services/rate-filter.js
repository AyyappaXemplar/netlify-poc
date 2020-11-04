const sortByPremium = (a, b) => a.policy_premium - b.policy_premium

function getCheapestByCarrier(object, rate) {
  const cheapRate = object[rate.carrier_id]
  if (!cheapRate) {
    object[rate.carrier_id] = rate
  } else {
    const cheaperRate = [cheapRate, rate].sort(sortByPremium)[0]
    object[rate.carrier_id] = cheaperRate
  }
  return object
}

export default function getCheapestRateByCarrier(rates) {
  const cheapestRatesByCarrier = rates.reduce(getCheapestByCarrier,{})
  return Object.values(cheapestRatesByCarrier).sort(sortByPremium)
}
