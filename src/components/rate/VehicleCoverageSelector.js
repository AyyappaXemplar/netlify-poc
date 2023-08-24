import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch }   from 'react-redux'
import { Nav }                        from 'react-bootstrap'

import { coveragePackages }       from '../../constants/vehicle'
import { updateVehicleCoverages } from '../../actions/vehicles'
import { withTranslation }     from 'react-i18next'
import { updateQuote, sendQuoteByEmail } from "../../actions/quotes"
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
  const quickQuoteEmail = useSelector(state => state.data.quickQuoteEmail)
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
    const planCodeIndex = defaultActiveKey === MONTHLY_PAY_LABEL ? 0 : 1
    const payment_plan_code = paymentOptions[planCodeIndex].plan_code
    const isLiveProd = window.location.origin === "https://auto-quote.insureonline.com"
    const isLiveProdAllowed = process.env.REACT_APP_LIVE_PROD_ALLOWED
    const isQaAllowed = process.env.REACT_APP_QA_ALLOWED
    const isDevAllowed = process.env.REACT_APP_DEV_ALLOWED

    dispatch(updateQuote({ ...quote, payment_plan_code, quote_number })).finally(() => {
      if (isLiveProd && (isLiveProdAllowed && isLiveProdAllowed==='true')) {
        dispatch(sendQuoteByEmail(process.env.REACT_APP_AGENT_QUOTE_EMAIL))
      }
      if (!isLiveProd && ((isQaAllowed && isQaAllowed==='true') || (isDevAllowed && isDevAllowed==='true'))) {
        dispatch(sendQuoteByEmail(process.env.REACT_APP_DEV_QUOTE_EMAIL))
      }
    }) 
  }, [defaultActiveKey, quote, dispatch, rate])

  useEffect(() => {
    if (quickQuoteEmail.initialLoad === false) {
      if (rate.id !== quote.quote_number) update_quote()
    }
    if (updatingVehicleCoverage) return
    if (selectedCoverage !== vehicle.coverage_package_name) dispatch(updateVehicleCoverages(vehicle, selectedCoverage))
  }, [dispatch, vehicle, selectedCoverage, updatingVehicleCoverage, quote, activeTab, update_quote, rate, quote.quote_number, rate.id, quickQuoteEmail.initialLoad])

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
      onSelect={handleSelect}
    >
      { Object.values(coveragePackages).map((coverage, index) => (
        <Nav.Item className="flex-1" key={coverage} >
          <Nav.Link
            disabled={updatingVehicleCoverage}
            onSelect={() => setSelectedCoverage(coverage)}
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

