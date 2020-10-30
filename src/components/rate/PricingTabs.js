import React from 'react';
import { withTranslation } from 'react-i18next';
import { Tab, Tabs } from 'react-bootstrap';
import CoverageStrength from '../shared/CoverageStrength';
import CoveragePricing from '../shared/CoveragePricing';
import { monthlyPaymentOption, priceDisplay, payInFullOption, paymentDetailsDisplay } from '../../services/payment-options';
import { ReactComponent as CheckIcon }  from '../../images/check-circle-fill.svg';
import { averageCoverageStrength } from '../../services/rate-quality';

function PricingTabs({ rate, quote }) {
  const PAY_IN_FULL_LABEL = 'Pay In Full'
  const MONTHLY_PAY_LABEL = 'Monthly'
  const baseUrl = process.env.REACT_APP_BUY_ONLINE_URL

  function displayedPaymentOptions() {
    return [monthlyPaymentOption(rate), payInFullOption(rate)]
  }

  function priceTabs() {
    return displayedPaymentOptions().map((option, index) => {
      let price = priceDisplay(option)
      let title = option.plan_type === 'pay_in_full' ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL
      let titleComponent = () => <div className="text-center p-2">{title}</div>
      let paymentDetails = paymentDetailsDisplay(option);

      let discounts = [];
      if (quote.homeowner) { discounts.push("Homeowners Discount") }
      if (quote.currently_insured) { discounts.push("Currently Insured Discount") }
      if (quote.vehicles.length > 1) { discounts.push("Multi-Car Discount") }

      // Build the Buy Online Button URL
      let quoteNumber = rate.id;
      let zipCode     = quote.zip_code;
      let carrier     = rate.carrier_id;
      let product     = rate.carrier_product_id;
      let language    = "en"
      let buyOnline = `${baseUrl}?QuoteNumber=${quoteNumber}&ZipCode=${zipCode}&Carrier=${carrier}&Product=${product}&language=${language}`;

      let averageStrength = averageCoverageStrength(rate);

      return (
        <Tab eventKey={title} key={title} title={titleComponent()} className="mb-5">
          <div className="rate-item-card">
            <div className="title mb-2">Quote #{rate.id}</div>
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

            <span className="d-block price-fees">{paymentDetails}</span>

            <div className="mb-3"><CoverageStrength strength={averageStrength}/></div>
            <div className="mb-3"><CoveragePricing  strength={averageStrength}/></div>

            { discounts.length && (
              <div className="coverage-graph-item">
                <span className="text-success">
                  <CheckIcon/>
                </span>
                <span>{discounts.length} Discounts Applied</span>
              </div>

            )}

            <div className="mx-auto mt-5 mb-2">
              <a className="rounded-pill btn btn-primary btn-block btn-lg" href={buyOnline}>Buy Online</a>
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
