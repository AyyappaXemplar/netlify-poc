import React                          from 'react';
import { useSelector }   from 'react-redux';
import { withTranslation }            from 'react-i18next';
//import { Form }                       from 'react-bootstrap';

// import { updateQuote } from '../../actions/quotes'
// import mixpanel        from '../../config/mixpanel'

import Discount      from '../shared/Discount'
//import CustomCard from '../shared/CustomCard'
//import { ReactComponent as CheckIcon } from '../../images/check-circle-fill.svg';

function QuoteDiscounts({ t }) {
  //const icon = <CheckIcon/>
  const quote = useSelector(state => state.data.quote)
  //const [payInFull, setPayInFull] = useState(quote.pay_in_full)

  const discounts = []
  //const dispatch = useDispatch()

  discounts.push({ title: t("discountsTypes.Homeowners"), body: t("discountPercents.10Percent"), applied: quote.homeowner })
  discounts.push({ title: t("discountsTypes.CurrentlyInsured"), body: t("discountPercents.5Percent"), applied: quote.currently_insured })
  discounts.push({ title: t("discountsTypes.multiCar"), body: t("discountPercents.15Percent"), applied: quote.vehicles.length > 1 })
  // discounts.push({ title: "Good Driver Discount", body: '', applied: quote.good_driver})
  // discounts.push({ title: "Good Student Discount", body: '', applied: quote.good_student})
  // discounts.push({ title: "Completed a defensive driver course", body: '', applied: quote.defensive_driver})
  // discounts.push({ title: "Requires SR-22", body: '', applied: quote.requires_sr22})

  const discountsComponent = discounts.map((discount, index) => <Discount key={index} discount={discount}/>)

  // function onChange() {
  //   dispatch(updateQuote({ ...quote, pay_in_full: !payInFull }))
  //   setPayInFull(!payInFull)
  //   if (payInFull) mixpanel.track('Selected "pay in full"')
  // }

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
      {/* <CustomCard icon={icon} title={"Pay In Full Discount"} body={'Save up to 15%'} iconBg={payInFull ? 'text-success' : ''} bodyCss="text-primary">
        <Form>
          <Form.Check
            className="discount-checkmark mr-3"
            custom
            selected={payInFull}
            checked={payInFull}
            onChange={onChange}
            type={'checkbox'}
            id={`custom-checkbox`}
            label=""
          />
        </Form>
      </CustomCard> */}
    </>
  )

}

export default withTranslation(['quotes'])(QuoteDiscounts)
