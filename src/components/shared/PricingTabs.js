import React from 'react';
import { withTranslation } from 'react-i18next';
import { Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QuoteCoverageStrength from '../shared/QuoteCoverageStrength';
import QuoteCoveragePricing from '../shared/QuoteCoveragePricing';
import rate from '../../server/rate'

class QuotesRate extends React.Component {
  bestMonthlyRate(rates) {
    const monthlyPaymentOptions = rates.best_match.payment_options.filter(option => option.plan_type === 'monthly')
    const byIntallmentNumber = (a, b) => {
      const compareRegex = /(\d+) Installments/
      const installments = [a, b].map(item => item.plan_description.match(compareRegex)[1])
      return installments.reduce((a, b) => (a - b), 0);
    }

    return monthlyPaymentOptions.sort(byIntallmentNumber)[0]
  }

  displayedPaymentOptions() {
    const { rates } = this.props
    const payInFullOption = rates.best_match.payment_options.find(item => item.plan_type === 'pay_in_full')
    return [this.bestMonthlyRate(rates), payInFullOption]
  }

  priceTabs() {
    const { quote, rates } = this.props


    return this.displayedPaymentOptions().map((option, index) => {
      let price = option.policy_premium / 100
      let titleComponent = () => {
        let title = option.plan_type === 'pay_in_full' ? option.plan_description : "Monthly"
        return <div className="text-center p-2">{title}</div>
      }

      return (
        <Tab eventKey={option.plan_description} key={option.plan_description} title={titleComponent()} className="mb-5">
          <div className="rated-quote-item-card p-5">
            <div className="title mb-3">Quote #{quote.id}</div>
            <div className="d-flex price-container mb-5">
              <p className="price-container__price quote-price display-1 mb-0">
                <sup className="price-container__dollar">$</sup>
                {price}
              </p>
              <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> month</span>
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
    const { rates } = this.props;
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

export default withTranslation(['quotes'])(QuotesRate);
