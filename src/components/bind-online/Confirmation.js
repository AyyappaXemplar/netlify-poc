import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch }   from 'react-redux'
import { withTranslation }            from 'react-i18next';

import { completeQuote } from '../../actions/quotes';
import SpinnerScreen     from '../shared/SpinnerScreen';

const Confirmation = ({ t, match, history }) => {
  const { quoteId }               = match.params
  const { updatingQuoteInfo }     = useSelector(redux => redux.state)
  const dispatch                  = useDispatch()
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!submitted) {
      setSubmitted(true)
      dispatch(completeQuote(quoteId))
    }
  }, [dispatch, quoteId, submitted])

  useEffect(() => {
    if (!updatingQuoteInfo && submitted) {
      history.push(`/bol/quotes/${quoteId}/final`)
    }
  }, [updatingQuoteInfo, quoteId, history, submitted])


  return <SpinnerScreen title="Fetching your documents" />
}

export default withTranslation(['common'])(Confirmation)
