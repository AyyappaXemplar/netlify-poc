import React from 'react';
import { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import history from "../../history";
import TitleRow from "../shared/TitleRow";

function QuotesSubmit({ state, rateQuote, t, setAlert, data }) {
  const { ratingQuote } = state

  useEffect(() => { rateQuote() }, [])

  // spinner behavior
  const [spinner, setSpinner]= useState(false)
  useEffect(() => {
    const spinnerValue = ratingQuote ? true : false
    setSpinner(spinnerValue)
  }, [ratingQuote])


  // redirect or show error
  useEffect(() => {
    const { quote } = data
    if ( ratingQuote === false && quote.error) {
      setAlert({variant: 'danger', text:  `There was an error submitting your quote`})
    } else if (ratingQuote === false) {
      history.push('/quotes/rated')
    }
  }, [ratingQuote])

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
