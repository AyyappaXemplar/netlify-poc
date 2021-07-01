import React, { useState }   from 'react';
import { withTranslation }   from 'react-i18next';
import { useDispatch }       from 'react-redux';
import { Tab, Tabs, Button } from 'react-bootstrap';

import CoverageStrength from '../shared/CoverageStrength';
import CoveragePricing  from '../shared/CoveragePricing';
import AppliedDiscounts from '../shared/AppliedDiscounts';
import PaymentDetails   from '../shared/PaymentDetails';
import PolicyLength     from '../shared/PolicyLength';

import { monthlyPaymentOption, priceDisplay,
         payInFullOption, payInFullDiscount,
         formatMoney }             from '../../services/payment-options';
import { averageCoverageStrength } from '../../services/rate-quality';
import isMonitoredDriverProgram    from '../../services/isMonitoredDriverProgram';

import { purchaseQuote }           from '../../actions/quotes'
import mixpanel                    from '../../config/mixpanel'
import mdpIcon                     from '../../images/mdp.svg'
import LabledPopover               from '../shared/LabledPopover';


function PricingTabs({ rate, quote, setShowTransitionModal, setShowEmailQuoteModal,
                       setSubmittedPurchasing, t }) {
  const PAY_IN_FULL_LABEL = 'Pay In Full'
  const MONTHLY_PAY_LABEL = 'Monthly'
  const defaultActiveKey  = quote.pay_in_full ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL
  const [activeTab, setActiveTab] = useState(defaultActiveKey)
  const dispatch = useDispatch()


  function displayedPaymentOptions() {
    return [monthlyPaymentOption(rate), payInFullOption(rate)]
  }

  function payInFullDiscountAmount() {
   return payInFullDiscount(rate);
  }

  function showTransitionModal(event) {
    event.preventDefault()
    mixpanel.track('Click BOL')
    setShowEmailQuoteModal(false)
    setSubmittedPurchasing(true)

    const paymentOptions = displayedPaymentOptions()
    const planCodeIndex = activeTab === MONTHLY_PAY_LABEL ? 0 : 1
    const payment_plan_code = paymentOptions[planCodeIndex].plan_code
    const quote_number = rate.id
    dispatch(purchaseQuote({ ...quote, payment_plan_code, quote_number }))
  }

  function showEmailQuoteModal(event) {
    event.preventDefault()
    setShowEmailQuoteModal(true)
  }

  function priceTabs() {
    return displayedPaymentOptions().map(option => {
      let price = priceDisplay(option)
      let title = option.plan_type === 'pay_in_full' ? PAY_IN_FULL_LABEL : MONTHLY_PAY_LABEL
      const planType = option.plan_type
      let titleComponent = () => (
        <div className="text-center p-2">
          {planType === "pay_in_full" ? t("payInFull") : t("monthly")}
          {
            (option.plan_type === 'pay_in_full' && payInFullDiscountAmount() > 0) &&
            <span className="d-block d-sm-inline ml-2 font-weight-normal text-primary">{t("save")} ${formatMoney(Math.ceil(payInFullDiscountAmount()/100))}!</span>
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
            <div className="title mb-2">{t("Quote")} #{rate.id}</div>
            <div>{t("asLowAs")}</div>
            <div className="d-flex price-container mb-2">
              <p className="price-container__price quote-price display-1 mb-0">
                <sup className="price-container__dollar">$</sup>
                {price}
              </p>
              <span className="price-container__text align-self-end ml-1">
                {t("per")}<br/>
                { option.plan_type === 'monthly' ? t("month") : t("term") }
              </span>
            </div>

            <PaymentDetails option={option} />

            {/* {isMonitoredDriverProgram(rate) && <LabledPopover title={ t(`${"monitoredDriverPopoverAndLabel.title"}`) } copy={ t(`${"monitoredDriverPopoverAndLabel.copy"}`) } label={ t(`${"monitoredDriverPopoverAndLabel.label"}`) } icon={ mdpIcon }/>} */}

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
                onClick={showTransitionModal}>{t("bol")}</Button>
            </div>
            <div className="mx-auto text-center mt-3 mb-0 coverage-graph-item">
              <Button onClick={showEmailQuoteModal} variant='link' className="email-quote-btn">{t("emailMessage")}</Button>
            </div>
          </div>
        </Tab>
      )
    })
  }

  return (
    <div className='bg-white shadow-lg rate-card-tabs'>
      <Tabs transition={false} defaultActiveKey={defaultActiveKey} onSelect={(tabName) => setActiveTab(tabName)} className="nav-justified">
        { priceTabs() }
      </Tabs>
    </div>
  )
}

export default withTranslation(['quotes'])(PricingTabs);
