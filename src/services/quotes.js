export function findPolicyHolder(quote) {
  return quote.drivers.find(driver => driver.policyholder)
}
