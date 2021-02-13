function getDecuctiblesFromCoverage(coverage) {
  const { type, description, package: covPackage, limits } = coverage

  let deductibleOptions = limits.map(limit => limit.amount)
  const hasOptions = deductibleOptions.some(option => typeof option !== 'number')


  if (hasOptions && deductibleOptions.length === 2) {
    // we have two arrays with options, one for each limit. We need to zip both arrays
    // in order to present them as a combined option for the deductibles
    const limit1Amounts = deductibleOptions[0]
    const limit2Amounts = deductibleOptions[1]
    deductibleOptions = limit1Amounts.map((limit, index) => [limit, limit2Amounts[index]])
  } //else if (typeof deductibleOptions[0] !== 'number') {
    // we have one array of options for a single limit.
    // We need to present if as a nested array, so the front end understands that
    // needs to present it as choices
    // deductibleOptions = [deductibleOptions]
  // }

  // return { deductibleOptions }
  return { hasOptions, deductibleOptions,limits, type, description, covPackage }
}

export function getDeductibleOptions(rate) {
  let rawCoverages
  const { carrier_id: carrier, carrier_product_id: product,
          carrier_product_state_code: state } = rate
  const filename = `${carrier}-${product}-${state}`


  try {
    rawCoverages = require(`../data/carrier-state-products/${filename}`)
  } catch (err) {
    rawCoverages = require(`../data/carrier-state-products/default-${state}`)
  }

  return rawCoverages.map(getDecuctiblesFromCoverage)
}

/*

which ones are options?
any amount array in which an element is an array
if that's the case, what do you have to do?
zip it array per limit => options for both limits

how do I assign that?
- select  an option
option [n] for limit [n]

*/
