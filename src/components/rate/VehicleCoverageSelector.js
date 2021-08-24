import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch }   from 'react-redux'
import { Nav }                        from 'react-bootstrap'

import { coveragePackages }       from '../../constants/vehicle'
import { updateVehicleCoverages } from '../../actions/vehicles'
import { withTranslation }     from 'react-i18next'
import { updateQuote } from "../../actions/quotes"
import {
  monthlyPaymentOption,
  payInFullOption
} from '../../services/payment-options';

function VehicleCoverageSelector({ vehicle, rate, t }) {
  const LABELS=[t("coverages.Basic"), t("coverages.Better"), t("coverages.Enhanced")]

  const COVERAGE_PACKAGE_MAPPINGS = {
    LIABILITY: LABELS[0],
    GOOD:      LABELS[1],
    BETTER:    LABELS[2]
  }

  const updatingVehicleCoverage = useSelector(state => state.state.updatingVehicleCoverage)
  const quote = useSelector(state => state.data.quote)
  const all_rates = useSelector(state => state.data.rates)
  const initial_rate = useSelector(state => state.data.rates[0])
  const rating_quote = useSelector(state => state.ratingQuote)
  const PAY_IN_FULL_LABEL = 'Pay In Full'
  const MONTHLY_PAY_LABEL = 'Monthly'
  const defaultActiveKey  = quote.pay_in_full ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL

  const [selectedCoverage, setSelectedCoverage] = useState(vehicle.coverage_package_name)
  // eslint-disable-next-line
  const [activeTab, setActiveTab] = useState(defaultActiveKey)

  const dispatch = useDispatch()

  const update_quote = useCallback(() => {
    const displayedPaymentOptions = () => {
      return [monthlyPaymentOption(rate), payInFullOption(rate)]
    }

    const quote_number = rate.id
    const paymentOptions = displayedPaymentOptions()
    const planCodeIndex = activeTab === MONTHLY_PAY_LABEL ? 0 : 1
    const payment_plan_code = paymentOptions[planCodeIndex].plan_code
    dispatch(updateQuote({ ...quote, quote_number }))   
  }, [activeTab, quote, dispatch, rate])

  useEffect(() => {
    if (updatingVehicleCoverage) return
    if (selectedCoverage !== vehicle.coverage_package_name) {
      const displayedPaymentOptions = () => {
        return [monthlyPaymentOption(rate), payInFullOption(rate)]
      }
  
      const quote_number = rate.id
      const paymentOptions = displayedPaymentOptions()
      const planCodeIndex = activeTab === MONTHLY_PAY_LABEL ? 0 : 1
      const payment_plan_code = paymentOptions[planCodeIndex].plan_code
      // dispatch(updateQuote({ ...quote, quote_number, payment_plan_code }))   
  
      dispatch(updateVehicleCoverages(vehicle, selectedCoverage, quote, quote_number, payment_plan_code))
      // dispatch(updateVehicleCoverages(vehicle, selectedCoverage)).finally(() => update_quote())
      // dispatch(updateVehicleCoverages(vehicle, selectedCoverage)).then(() => quote.quote_number !== rate.id && update_quote())
    }
    // if (rate && !updatingVehicleCoverage) update_quote(rate)
    // if (updatingVehicleCoverage !== !updatingVehicleCoverage) {
      
    // }
  }, [dispatch, vehicle, selectedCoverage, updatingVehicleCoverage, quote, activeTab, update_quote, rate, quote.quote_number, rate.id])

  const handleSelect = (eventKey) => setSelectedCoverage(eventKey)

  const navLinkLabelDisplay = (coverage) => {
    let label = COVERAGE_PACKAGE_MAPPINGS[coverage]
    if (coverage !== selectedCoverage) return label

    return updatingVehicleCoverage ?
      <div className="spinner-border spinner-border-sm text-med-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      :
      label
  }

  return (
    <Nav variant="pills"
      activeKey={selectedCoverage}
      className="justify-content-center p-1 rounded bg-med-light mb-4"
      onSelect={(e) => {
        handleSelect(e)
        // update_quote()
      }}
      // onClick={update_quote}
    >
      { Object.values(coveragePackages).map((coverage, index) => (
        <Nav.Item className="flex-1" key={coverage} >
          <Nav.Link
            disabled={updatingVehicleCoverage}
            onSelect={() => {
              setSelectedCoverage(coverage)
              // update_quote()
            }}
            className={`w-100 text-center ${updatingVehicleCoverage ? 'text-medium' : ''}`}
            eventKey={coverage}>
            {navLinkLabelDisplay(coverage)}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default withTranslation(["rates"])(VehicleCoverageSelector)

