import React, { useState, useEffect,
                useRef }             from 'react';
import { useSelector, useDispatch }   from 'react-redux';
import { withTranslation }            from 'react-i18next';
import { Form }                       from 'react-bootstrap';

import { updateQuote } from '../../actions/quotes'

import Discount      from './Discount'
import QuoteItemCard from './QuoteItemCard'
import { ReactComponent as CheckIcon } from '../../images/check-circle-fill.svg';

function QuoteDiscounts({ t }) {
  const icon = <CheckIcon/>
  const quote = useSelector(state => state.data.quote)
  const [payInFull, setPayInFull] = useState(quote.pay_in_full)

  const discounts = []
  const dispatch = useDispatch()

  discounts.push({ title: 'Homeowners discount', body: 'Save up to 10%', applied: quote.homeowner })
  discounts.push({ title: 'Currently insured discount', body: 'Save up to 5%', applied: quote.currently_insured })
  discounts.push({ title: 'Multi-car discount', body: 'Save up to 15%', applied: quote.vehicles.length })
  // discounts.push({ title: "Good Driver Discount", body: '', applied: quote.good_driver})
  // discounts.push({ title: "Good Student Discount", body: '', applied: quote.good_student})
  // discounts.push({ title: "Completed a defensive driver course", body: '', applied: quote.defensive_driver})
  // discounts.push({ title: "Requires SR-22", body: '', applied: quote.requires_sr22})

  const discountsComponent = discounts.map((discount, index) => <Discount key={index} discount={discount}/>)

  useEffect(() => {
    dispatch(updateQuote({ ...quote, pay_in_full: payInFull }))
  }, [payInFull, dispatch, quote.id])

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
      <QuoteItemCard icon={icon} title={"Pay In Full Discount"} body={'Save up to 15%'} iconBg={payInFull ? 'text-success' : ''} bodyCss="text-primary">
        <Form>
          <Form.Check
            className="discount-checkmark mr-3"
            custom
            selected={quote.pay_in_full}
            checked={quote.pay_in_full}
            onChange={() => setPayInFull(!payInFull)}
            type={'checkbox'}
            id={`custom-checkbox`}
            label=""
          />
        </Form>
      </QuoteItemCard>
    </>
  )

}

export default withTranslation(['quotes'])(QuoteDiscounts)
