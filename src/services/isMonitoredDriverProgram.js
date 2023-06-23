const isMonitoredDriverProgram = (rate) => {
  const USIC_LABEL = "USIC";
  const CARRIER_STATE_INDIANA = "IN"
  return rate.carrier_id === USIC_LABEL && rate.carrier_product_state_code === CARRIER_STATE_INDIANA ? true : false
}

export default isMonitoredDriverProgram
