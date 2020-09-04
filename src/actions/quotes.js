import Axios from 'axios';
import * as types from '../constants/quote-action-types';

const apiBase = process.env.REACT_APP_API_BASE_URL
const namespace = process.env.REACT_APP_API_NAMESPACE

export const createQuote = (zipCode) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_QUOTE });

    return Axios.post(`${apiBase}/${namespace}/quotes`, { zip_code: zipCode })
      .then(response => {
        dispatch(createQuoteResponse(response.data));
        localStorage.setItem('siriusQuoteId', response.data.id)
      }).catch(e => {
        dispatch(createQuoteResponse({ error: `We don't cover ${zipCode}` }));
      })
  }
}

const createQuoteResponse = (data) => ({
  type: types.CREATED_QUOTE,
  data
})

export const updateQuote = (quote) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch) => {
    dispatch({ type: types.UPDATING_QUOTE });

    return Axios.patch(`${apiBase}/${namespace}/quotes/${quoteId}`, quote)
      .then(response => {
        dispatch(receiveUpdateQuoteResponse(response.data));
      }).catch(error => {
        dispatch(receiveUpdateQuoteResponse('error'));
      })
  }
}

const receiveUpdateQuoteResponse = (data) => ({
  type: types.UPDATED_QUOTE,
  data
})