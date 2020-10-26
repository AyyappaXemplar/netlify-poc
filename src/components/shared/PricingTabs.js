import React from 'react';
import { withTranslation } from 'react-i18next';
import { Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QuoteCoverageStrength from '../shared/QuoteCoverageStrength';
import QuoteCoveragePricing from '../shared/QuoteCoveragePricing';
import { monthlyPaymentOption, priceDisplay, payInFullOption } from '../../services/payment-options'
// import rate from '../../server/rate'

class PricingTabs extends React.Component {
  displayedPaymentOptions() {
    const { rate } = this.props
    return [monthlyPaymentOption(rate), payInFullOption(rate)]
  }

  priceTabs() {
    const { quote, rate } = this.props

    return this.displayedPaymentOptions().map((option, index) => {
      let price = priceDisplay(option)
      let titleComponent = () => {
        let title = option.plan_type === 'pay_in_full' ? option.plan_description : "Monthly"
        return <div className="text-center p-2">{title}</div>
      }

      return (
        <Tab eventKey={option.plan_description} key={option.plan_description} title={titleComponent()} className="mb-5">
          <div className="rate-item-card p-5">
            <div className="title mb-3">Quote #{rate.id}</div>
            <div className="d-flex price-container mb-5">
              <p className="price-container__price quote-price display-1 mb-0">
                <sup className="price-container__dollar">$</sup>
                {price}
              </p>
              <span className="price-container__text align-self-end text-med-dark ml-1">
                per<br/>
                { option.plan_type === 'monthly' ? 'month' : "year" }
              </span>

            </div>
            <div className="mb-3"><QuoteCoverageStrength strength={'GOOD'}/></div>
            <div className="mb-3"><QuoteCoveragePricing  strength={'GOOD'}/></div>
            <div className="mx-auto mb-5">
              <Link className="rounded-pill btn btn-primary btn-block btn-lg" to={'/#'}>Buy Online</Link>
            </div>
          </div>
        </Tab>
      )
    })
  }

  render() {
    // const { rates } = this.props;
    const priceTabs = this.priceTabs()
    const defaultActiveKey = this.displayedPaymentOptions()[0].plan_description

    return (
      <div className='bg-white shadow-sm'>
        <Tabs transition={false} defaultActiveKey={defaultActiveKey}>
          { priceTabs }
        </Tabs>
      </div>
    )
  }
}

export default withTranslation(['quotes'])(PricingTabs);
