export default function addressDisplay(address, fullAddress=false) {
  const line2 = fullAddress ? `${address.line2}` : ''
  return `${address.line1} ${line2}${address.city}`
}
