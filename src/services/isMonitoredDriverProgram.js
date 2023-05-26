const isMonitoredDriverProgram = (rate) => {
  const USHC_LABEL = "USHC";
  const CARRIER_STATE_INDIANA = "IN"
  return rate.carrier_id === USHC_LABEL && rate.carrier_product_state_code === CARRIER_STATE_INDIANA ? true : false
}

export default isMonitoredDriverProgram
