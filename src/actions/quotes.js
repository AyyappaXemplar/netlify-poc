import Axios from 'axios';
import * as types from '../constants/quote-action-types';

const apiBase = process.env.REACT_APP_API_BASE_URL
const namespace = process.env.REACT_APP_API_NAMESPACE

export const getQuote = () => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return dispatch => {
    dispatch({ type: types.GETTING_QUOTE })

    return Axios.get(`${apiBase}/${namespace}/quotes/${quoteId}`)
      .then(response => {
        dispatch({ type: types.RECEIVING_QUOTE, data: response.data })
      })
  }
}

export const createQuote = (quoteParams) => {
  return dispatch => {
    dispatch({ type: types.CREATING_QUOTE });

    return Axios.post(`${apiBase}/${namespace}/quotes`, quoteParams)
      .then(response => {
        dispatch(createQuoteResponse(response.data));
        localStorage.setItem('siriusQuoteId', response.data.id)
      }).catch(e => {
        dispatch(createQuoteResponse({ error: `We don't cover ${quoteParams.address.zip}` }));
      })
  }
}

const createQuoteResponse = (data) => ({
  type: types.CREATED_QUOTE,
  data
})

export const updateQuote = (quote) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return dispatch => {
    dispatch({ type: types.UPDATING_QUOTE });

    return Axios.patch(`${apiBase}/${namespace}/quotes/${quoteId}`, quote)
      .then(response => {
        dispatch(receiveUpdateQuoteResponse(response.data))
      }).catch(error => {
        dispatch(receiveUpdateQuoteResponse('error'));
      })
  }
}

const receiveUpdateQuoteResponse = (data) => ({
  type: types.UPDATED_QUOTE,
  data
})

export const rateQuote = () => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch, getState) => {
    const { quote } = getState()
    dispatch({ type: types.RATING_QUOTE });

    return Axios.get(`${apiBase}/${namespace}/quotes/${quoteId}/rates`)
      .then(response => {
        dispatch(receiveRateQuoteResponse(response.data))
      }).catch(error => {
        dispatch(receiveRateQuoteResponse({ error: 'There was an error rating your quote'}));
      })
  }
}

const receiveRateQuoteResponse = (data) => ({
  type: types.RATED_QUOTE,
  data
})
