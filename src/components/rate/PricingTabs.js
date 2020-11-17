import React               from 'react';
import { withTranslation } from 'react-i18next';
import { Tab, Tabs }       from 'react-bootstrap';

import CoverageStrength from '../shared/CoverageStrength';
import CoveragePricing  from '../shared/CoveragePricing';
import AppliedDiscounts from '../shared/AppliedDiscounts';
import PaymentDetails   from '../shared/PaymentDetails';
import PolicyLength     from '../shared/PolicyLength';
import { Button }       from 'react-bootstrap';

import { monthlyPaymentOption, priceDisplay,
         payInFullOption, payInFullDiscount,
         formatMoney } from '../../services/payment-options';
import { averageCoverageStrength } from '../../services/rate-quality';

function PricingTabs({ rate, quote, setShow }) {
  const PAY_IN_FULL_LABEL = 'Pay In Full'
  const MONTHLY_PAY_LABEL = 'Monthly'


  function displayedPaymentOptions() {
    return [monthlyPaymentOption(rate), payInFullOption(rate)]
  }

  function payInFullDiscountAmount() {
   return payInFullDiscount(rate);
  }

  function transitionModal(event) {
    event.preventDefault()
    setShow(true)
  }

  function priceTabs() {
    return displayedPaymentOptions().map((option, index) => {
      let price = priceDisplay(option)
      let title = option.plan_type === 'pay_in_full' ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL

      let titleComponent = () => (
        <div className="text-center p-2">
          {title}
          {
            (option.plan_type === 'pay_in_full' && payInFullDiscountAmount() > 0) &&
            <span className="d-block d-sm-inline ml-2 font-weight-normal text-primary">Save ${formatMoney(Math.ceil(payInFullDiscountAmount()/100))}!</span>
          }
        </div>
      )

      let discounts = [];
      if (quote.homeowner) { discounts.push("Homeowners Discount") }
      if (quote.currently_insured) { discounts.push("Currently Insured Discount") }
      if (quote.vehicles.length > 1) { discounts.push("Multi-Car Discount") }

      let averageStrength = averageCoverageStrength(rate);

      return (
        <Tab eventKey={title} key={title} title={titleComponent()} className="mb-5">
          <div className="rate-item-card">
            <div className="title mb-2">Quote #{rate.id}</div>
            <div>As low as...</div>
            <div className="d-flex price-container mb-2">
              <p className="price-container__price quote-price display-1 mb-0">
                <sup className="price-container__dollar">$</sup>
                {price}
              </p>
              <span className="price-container__text align-self-end ml-1">
                per<br/>
                { option.plan_type === 'monthly' ? 'month' : "term" }
              </span>
            </div>

            <PaymentDetails option={option}/>

            <div className="mb-3">
              <CoverageStrength strength={averageStrength}/>
            </div>

            <div className="mb-3">
              <CoveragePricing  strength={averageStrength}/>
            </div>

            <div className="mb-3">
              <AppliedDiscounts discounts={discounts}/>
            </div>

            <PolicyLength term={rate.term} />

            <div className="mx-auto mt-5 mb-2">
              <Button className="rounded-pill btn btn-primary btn-block btn-lg" type="link" href="#" onClick={transitionModal}>Buy Online</Button>
            </div>
          </div>
        </Tab>
      )
    })
  }

  const defaultActiveKey = quote.pay_in_full ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL

  return (
    <div className='bg-white shadow-lg rate-card-tabs'>
      <Tabs transition={false} defaultActiveKey={defaultActiveKey} className="nav-justified">
        { priceTabs() }
      </Tabs>
    </div>
  )
}

export default withTranslation(['quotes'])(PricingTabs);
