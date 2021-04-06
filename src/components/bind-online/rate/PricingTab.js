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
import history                     from '../../../history'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Popover } from "react-bootstrap"

function PricingTabs({ rate, quote, setShowEmailQuoteModal }) {
  const monthlyOption = monthlyPaymentOption(rate)
  const annualOption  = payInFullOption(rate)

  function goToPaymentsPage(event) {
    mixpanel.track('Click Select Payment Plan')
    history.push('/bol/payments')
  }

  // function showEmailQuoteModal(event) {
  //   event.preventDefault()
  //   setShowEmailQuoteModal(true)
  // }

  let price = priceDisplay(monthlyOption)
  let payInFullPrice = priceDisplay(annualOption)
  let payInFullDiscountAmount = formatMoney(payInFullDiscount(rate)/100);

  let discounts = [];
  if (quote.homeowner) { discounts.push("Homeowners Discount") }
  if (quote.currently_insured) { discounts.push("Currently Insured Discount") }
  if (quote.vehicles.length > 1) { discounts.push("Multi-Car Discount") }

  let averageStrength = averageCoverageStrength(rate);

  const tooltipData = "One of the major factors in your auto insurance rate is driving history. When updating your quote, we ran a Motor Vehicle Report (MVR) to analyze the driving history of all drivers included in the policy. If the report reveals violations or accidents for any of the drivers then your rate can increase. If you have questions about your MVR or want to learn more, please call us now at 844-358-5605 or chat online with a licensed agent to assist you in getting the best rate possible."


  return (
    <div className='bg-white shadow-lg rate-card-tabs'>
      <div className="rate-item-card">
        <div className="mb-2 d-flex align-items-center justify-content-between">
          <div className="title">Quote #{rate.id}</div> 
          <div className="d-flex align-items-center">
            <p className="mb-0 pr-2 text-medium-dark" style={{ color: "#767F7B" }}>Rate change?</p>
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={
                <Popover id={`popover-positioned-bottom`} style={{ boxShadow: "2px 2px 10px 2px rgba(0,0,0,0.25)", border: "none" }}>
                  <Popover.Content className="my-2">
                  <Popover.Title className="mb-2 text-more-dark" as="h3" style={{ padding: 0, backgroundColor: "#fff", borderBottom: 0 }}>Why did my rate change?</Popover.Title>
                  {tooltipData}
                  </Popover.Content>
                </Popover>
              }
            >
              <AiOutlineInfoCircle style={{ height: "20px", width: "20px", color: "#BFC4C2" }}/>
            </OverlayTrigger>
          </div>
        </div>
        
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

        <span className="d-block price-fees text-medium-dark">Or save ${payInFullDiscountAmount} when you pay in full (${payInFullPrice} total)</span>

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
        {/* <div className="mx-auto text-center mt-3 mb-0 coverage-graph-item"> */}
        {/*   <Button onClick={showEmailQuoteModal} variant='link' className="email-quote-btn">Not ready to buy yet? Email yourself this quote.</Button> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default withTranslation(['quotes'])(PricingTabs);
