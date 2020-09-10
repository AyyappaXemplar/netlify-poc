import React from 'react';
import { withTranslation } from 'react-i18next';
import Discount from './Discount'
import history from '../../history';

class QuoteDiscounts extends React.Component {
  render() {
    const { t, disabled } = this.props
    // const { discounts } = this.props.data
    const discounts = [{
      title: 'Homeowners discount', body: 'Save up to 10%', applied: true
    },
    {
      title: 'Currently insured discount', body: 'Save up to 50%', applied: true
    }]
    const discountsComponent = discounts.map((discount, index) => <Discount key={index} discount={discount}/>)

    return(
      <>
        { !!discountsComponent.length ?
          <>
            <label>{t('fields.discounts.title')}</label>
            <div>
              { discountsComponent }
            </div>
          </>
         : false }
      </>
    )
  }
}

export default withTranslation(['quotes'])(QuoteDiscounts)
