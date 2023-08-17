import rawCoverages    from '../data/coverages'
import { formatMoney } from './payment-options'

function getAllCoverageTypes() {
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
                             'uninsured_motorist_bodily_injury','other_than_collision',
                             'underinsured_motorist_bodily_injury', 'medical_payments', 'rental', 'towing']
export const policyCoverageTypeDescriptions = ['Bodily Injury', 'Property Damage',
                             'Uninsured Motorist BI',"Uninsured Motorist PD",
                             'Underinsured Motorist BI', 'Medical Payments', 'Rental', 'Towing']

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
export function getCoveragesFromVehicle(coverages) {
  return coverages.filter(cov => !policyCoverageTypeDescriptions.includes(cov.description))
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
export let groupedCoverages = groupByType(rawCoverages)

export function getCoverageDisplay(vehicle, rate=undefined) {
  if (rate) {
      let rawCoverages
      const { carrier_id: carrier, carrier_product_id: product,
              carrier_product_state_code: state } = rate
      const filename = `${carrier}-${product}-${state}`
      console.log("filenamefilenamefilename", filename);
      try {
        rawCoverages = require(`../data/carrier-state-products/${filename}`)
      } catch (err) {
        rawCoverages = require(`../data/carrier-state-products/default-${state}`)
      }
      groupedCoverages = groupByType(rawCoverages)
  }
  const all = groupedCoverages.BETTER

  let displayedCoverages = vehicle.coverages.map(item => ({ ...item, included: true }))

  // fill the display with all excluded coverages and mark them as excluded
  all.forEach(item => {
    let included = vehicle.coverages.find(cov => cov.type === item.type)

    if (!included) displayedCoverages.push({ ...item, included: false })
  })
  return displayedCoverages
}

export const allCoverages     = getAllCoverageTypes()
export const vehicleCoverages = getVehicleCoverages()
export const policyCoverages  = getPolicyCoverages()
