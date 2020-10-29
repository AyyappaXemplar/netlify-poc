import React from 'react';
import { withTranslation } from 'react-i18next';
import { Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CoverageStrength from '../shared/CoverageStrength';
import CoveragePricing from '../shared/CoveragePricing';
import { monthlyPaymentOption, priceDisplay, payInFullOption } from '../../services/payment-options'
// import rate from '../../server/rate'

function PricingTabs({ rate, quote }) {
  const PAY_IN_FULL_LABEL = 'Pay In Full'
  const MONTHLY_PAY_LABEL = 'Monthly'

  function displayedPaymentOptions() {
    return [monthlyPaymentOption(rate), payInFullOption(rate)]
  }

  function priceTabs() {
    return displayedPaymentOptions().map((option, index) => {
      let price = priceDisplay(option)
      let title = option.plan_type === 'pay_in_full' ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL
      let titleComponent = () => <div className="text-center p-2">{title}</div>

      return (
        <Tab eventKey={title} key={title} title={titleComponent()} className="mb-5">
          <div className="rate-item-card">
            <div className="title mb-2">Quote #{rate.id}</div>
            <div className="d-flex price-container mb-1">
              <p className="price-container__price quote-price display-1 mb-0">
                <sup className="price-container__dollar">$</sup>
                {price}
              </p>
              <span className="price-container__text align-self-end ml-1">
                per<br/>
                { option.plan_type === 'monthly' ? 'month' : "term" }
              </span>
            </div>

            <span className="d-block price-fees">Includes all fees and taxes.</span>

            <div className="mb-3"><CoverageStrength strength={'GOOD'}/></div>
            <div className="mb-3"><CoveragePricing  strength={'GOOD'}/></div>

            <div className="mx-auto mt-5 mb-2">
              <Link className="rounded-pill btn btn-primary btn-block btn-lg" to={'/#'}>Buy Online</Link>
            </div>
          </div>
        </Tab>
      )
    })
  }

  const defaultActiveKey = quote.pay_in_full ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL

  return (
    <div className='bg-white shadow-lg rate-card-tabs'>
      <Tabs transition={false} defaultActiveKey={defaultActiveKey}>
        { priceTabs() }
      </Tabs>
    </div>
  )
}

export default withTranslation(['quotes'])(PricingTabs);
