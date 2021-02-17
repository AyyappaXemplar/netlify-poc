import React                 from 'react';
import { withTranslation }   from 'react-i18next';
import { Button } from 'react-bootstrap';

import CoverageStrength from '../../shared/CoverageStrength';
import CoveragePricing  from '../../shared/CoveragePricing';
import AppliedDiscounts from '../../shared/AppliedDiscounts';
import PolicyLength     from '../../shared/PolicyLength';

import { monthlyPaymentOption, priceDisplay,
         payInFullOption, payInFullDiscount,
         formatMoney }             from '../../../services/payment-options';
import { averageCoverageStrength } from '../../../services/rate-quality';
import mixpanel                    from '../../../config/mixpanel'

function PricingTabs({ rate, quote, setShowTransitionModal, setShowEmailQuoteModal,
                       setSubmittedPurchasing, activeTab, setActiveTab, defaultActiveKey }) {
  const monthlyOption = monthlyPaymentOption(rate)
  const annualOption  = payInFullOption(rate)

  function goToPaymentsPage(event) {
    event.preventDefault()
    mixpanel.track('Click Select Payment Plan')
  }

  function showEmailQuoteModal(event) {
    event.preventDefault()
    setShowEmailQuoteModal(true)
  }

  let price = priceDisplay(monthlyOption)
  let payInFullPrice = priceDisplay(annualOption)
  let payInFullDiscountAmount = formatMoney(payInFullDiscount(rate)/100);

  let discounts = [];
  if (quote.homeowner) { discounts.push("Homeowners Discount") }
  if (quote.currently_insured) { discounts.push("Currently Insured Discount") }
  if (quote.vehicles.length > 1) { discounts.push("Multi-Car Discount") }

  let averageStrength = averageCoverageStrength(rate);

  return (
    <div className='bg-white shadow-lg rate-card-tabs'>
      <div className="rate-item-card">
        <div className="title mb-2">Quote #{rate.id}</div>
        <div>As low as...</div>
        <div className="d-flex price-container mb-2">
          <p className="price-container__price quote-price display-1 mb-0">
            <sup className="price-container__dollar">$</sup>
            {price}
          </p>
          <span className="price-container__text align-self-end ml-1">
            per month<br/>
          </span>
        </div>

        <span className="d-block price-fees text-medium-dark">Save ${payInFullDiscountAmount} when you pay in full (${payInFullPrice} total)</span>

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

        <div className="mx-auto mt-5">
          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg" type="link" href="#"
            onClick={goToPaymentsPage}>Select Payment Plan</Button>
        </div>
        <div className="mx-auto text-center mt-3 mb-0 coverage-graph-item">
          <Button onClick={showEmailQuoteModal} variant='link' className="email-quote-btn">Not ready to buy yet? Email yourself this quote.</Button>
        </div>
      </div>
    </div>
  )
}

export default withTranslation(['quotes'])(PricingTabs);
