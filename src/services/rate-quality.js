export const rateStrengthValues = {
  BASIC:  1,
  GOOD:   2,
  BETTER: 3
}

export function averageCoverageStrength(rate) {
  let total   = rate.vehicles.length;
  let score   = 0;
  let average = 0;

  rate.vehicles.map((vehicle) => {
    let value = rateStrengthValues[vehicle.coverage_package_name]
    score += value;
  })

  average = Math.ceil(score / total);

  return Object.keys(rateStrengthValues).find(key => rateStrengthValues[key] === average);
}
