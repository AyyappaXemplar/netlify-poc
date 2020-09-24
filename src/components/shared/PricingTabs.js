import React from 'react';
import { withTranslation } from 'react-i18next';
import { Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QuoteCoverageStrength from '../shared/QuoteCoverageStrength';
import QuoteCoveragePricing from '../shared/QuoteCoveragePricing';

class QuotesRate extends React.Component {
  priceTabs() {
    const { quote } = this.props

    return quote.rate.payment_options.map((option, index) => {
      let price = option.policy_premium
      let title = <div className="text-center p-2">{option.plan_description}</div>

      return (
        <Tab eventKey={option.plan_description} key={option.plan_description} title={title} className="mb-5">
          <div className="rated-quote-item-card p-5">
            <div className="title mb-3">Quote #{quote.id}</div>
            <div className="d-flex price-container mb-5">
              <p className="price-container__price quote-price display-1 mb-0">
                <sup className="price-container__dollar">$</sup>
                {price}
              </p>
              <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> month</span>
            </div>
            <QuoteCoverageStrength strength={1}/>
            <QuoteCoveragePricing  strength={2}/>
            <div className="mx-auto mb-5">
              <Link className="rounded-pill btn btn-primary btn-block btn-lg" to={'/#'}>Buy Online</Link>
            </div>
          </div>
        </Tab>
      )
    })
  }

  render() {
    const { quote } = this.props;
    const priceTabs = this.priceTabs()
    const defaultActiveKey = quote.rate.payment_options[0].plan_description


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
