import rawCoverages    from '../data/coverages'
import { formatMoney } from './payment-options'
import { store } from '../index'

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
export const policyCoverageTypeDescriptions = ['Bodily Injury', 'Property Damage',
                             'Uninsured Motorist BI',
                             'Underinsured Motorist BI']

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

export function getPolicyCoveragesFromQuote(quote) {
  // all policy coverages should be the same for all vehicles,
  // so we just need to look at one vehicle
  return quote.vehicles[0].coverages.filter(cov => {
    return policyCoverageTypeDescriptions.includes(cov.description)
  })
}

// use this function to display the coverages from a vehicle
export function getCoveragesFromVehicle(vehicle) {
  return vehicle.filter(cov => !policyCoverageTypeDescriptions.includes(cov.description))
}

export function getCoverageValues(coverage) {
  return (
    coverage.limits.map(limit => {
      // Divide by 100 to go from cents to dollars
      let rounded = Math.round(limit.amount)/100;

      // If it's smaller than 1000, we'll want to
      // display as a number like $500 or $1,000.
      if (rounded <= 1000) {
        return `$${formatMoney(rounded)}`
      } else {
        rounded = Math.round(limit.amount)/100000;
        return `$${rounded}K`
      }
    }).join(' / ')
  )
}

export function getCoverageDisplay(vehicle) {
  const allCoverages = store.getState().data.coverages.groupedByType.BETTER

  let displayedCoverages = vehicle.coverages.map(item => ({ ...item, included: true }))

  // fill the display with all excluded coverages and mark them as excluded
  allCoverages.forEach(item => {
    let included = vehicle.coverages.find(cov => cov.type === item.type)

    if (!included) displayedCoverages.push({ ...item, included: false })
  })
  return displayedCoverages
}

export const groupedCoverages = groupByType(rawCoverages)
export const allCoverages     = getAllCoverages()
export const vehicleCoverages = getVehicleCoverages()
export const policyCoverages  = getPolicyCoverages()
