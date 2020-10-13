import React from 'react';
import { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import history from "../../history";
import TitleRow from "../shared/TitleRow";
import { useDispatch, useSelector } from 'react-redux' //shallowEqual,
import { rateQuote }  from '../../actions/quotes'
import { setAlert }  from '../../actions/state'

function QuotesSubmit({ t }) {
  const ratingQuote = useSelector(state => state.state.ratingQuote)
  const quote = useSelector(state => state.data.quote)
  const dispatch = useDispatch()

  useEffect(() => { console.log(dispatch); dispatch(rateQuote()) }, [dispatch])

  // spinner behavior
  const [spinner, setSpinner]= useState(false)
  useEffect(() => {
    const spinnerValue = ratingQuote ? true : false
    setSpinner(spinnerValue)
  }, [ratingQuote])


  // redirect or show error
  useEffect(() => {
    if ( ratingQuote === false && quote.error) {
      const alert = {variant: 'danger', text:  `There was an error submitting your quote`}
      dispatch(setAlert(alert))
    } else if (ratingQuote === false) {
      history.push('/quotes/rates')
    }
  }, [quote, dispatch, ratingQuote])

  return (
    <>
      <TitleRow colClassNames='text-center' title={t('quotes:submit.title')}/>
      {
        spinner &&
        <div className="text-center">
          <div className="spinner-border"role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
    </>
  )
}

export default withTranslation(['quotes'])(QuotesSubmit);
