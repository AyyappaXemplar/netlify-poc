import rawCoverages from '../data/coverages'

function getAllCoverages() {
  const allCoverages = rawCoverages.map(item => item.type)
  const coveragesSet = new Set(allCoverages);
  return [...coveragesSet]
}


function groupByType(coverages) {
  return coverages.reduce((groupedCoverages, item) => {
    if (groupedCoverages[item.package]) {
      groupedCoverages[item.package].push(item)
    } else {
      groupedCoverages[item.package] = [item]
    }
    return groupedCoverages
  }, {})
}


export const policyCoverageTypes = ['bodily_injury', 'property_damage',
                             'uninsured_motorist_bodily_injury',
                             'underinsured_motorist_bodily_injury']

function getPolicyCoverages() {
  const rawPolicyCoverages = rawCoverages.filter(cov => policyCoverageTypes.includes(cov.type))

  return groupByType(rawPolicyCoverages)
}


function getVehicleCoverages() {
  const rawVehicleCoverages = rawCoverages.filter(cov => !policyCoverageTypes.includes(cov.type))

  return groupByType(rawVehicleCoverages)
}

export function replacePolicyCoverages(vehicle, coveragePackage) {
  let { coverages= [] } = vehicle
  const newPolicyCoverages = policyCoverages[coveragePackage] || []

  coverages = coverages.filter(coverage => !policyCoverageTypes.includes(coverage.type))
  vehicle.coverages = [...coverages, ...newPolicyCoverages]

  return vehicle
}

export function replaceVehicleCoverages(vehicle, coveragePackage) {
  let { coverages= [] } = vehicle
  const newVehicleCoverages = vehicleCoverages[coveragePackage] || []

  coverages = coverages.filter(coverage => policyCoverageTypes.includes(coverage.type))
  vehicle.coverages = [...coverages, ...newVehicleCoverages]

  return vehicle
}

export const groupedCoverages = groupByType(rawCoverages)
export const allCoverages     = getAllCoverages()
export const vehicleCoverages = getVehicleCoverages()
export const policyCoverages  = getPolicyCoverages()
