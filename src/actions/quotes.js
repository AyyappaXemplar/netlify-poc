import Axios from 'axios';
import * as types from '../constants/quote-action-types';

const apiBase = process.env.REACT_APP_API_BASE_URL

export const createQuote = (zipCode) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_QUOTE });

    return Axios.post(`${apiBase}/api/quotes`, { zip_code: zipCode })
      .then(response => {
        dispatch(createQuoteResponse(response.data));
      }).catch(e => {
        const error = e.response.data.errors[0]
        dispatch(createQuoteResponse({ error }));
      })
  }
}

const createQuoteResponse = (data) => ({
  type: types.CREATED_QUOTE,
  data
})

export const updateQuote = (quote) => {
  const quote_id = JSON.parse(localStorage.getItem('siriusQuote')).id

  return (dispatch) => {
    dispatch({ type: types.UPDATING_QUOTE });

    return Axios.post(`${apiBase}/api/quotes/${quote_id}`, quote)
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
