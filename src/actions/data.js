import Axios from 'axios';
import * as types from '../constants/data-action-types';

const apiBase = process.env.REACT_APP_API_BASE_URL

export const createQuote = (zipCode) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_QUOTE });

    return Axios.post(`${apiBase}/api/quotes`, { zipCode })
      .then(response => {
        if (zipCode === '60647') {
          dispatch(createQuoteResponse(response.data));
        } else {
          dispatch(createQuoteResponse('error'));
        }
      }).catch(error => {
        debugger
        dispatch(createQuoteResponse('error'));
      })
  }
}

const createQuoteResponse = (data) => ({
  type: types.CREATED_QUOTE,
  data
})

export const updateQuote = (quote) => {
  const quote_id = JSON.parse(localStorage.getItem('quote')).id

  return (dispatch) => {
    dispatch({ type: types.UPDATING_QUOTE });

    return Axios.post(`https://api.insureonline.com/api/quotes/${quote_id}`, quote)
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
