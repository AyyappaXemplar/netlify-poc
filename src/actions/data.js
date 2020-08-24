import Axios from 'axios';
import * as types from '../constants/data-action-types';


export const verifyZip = (zipCode) => {
  return (dispatch) => {
    dispatch({ type: types.VERIFYING_ZIP });

    return Axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        if (zipCode === '60647') {
          dispatch(receiveZipValidation(response.data));
        } else {
          dispatch(receiveZipValidation('error'));
        }
      }).catch(error => {
        dispatch(receiveZipValidation('error'));
      })
  }
}

const receiveZipValidation = (data) => ({
  type: types.VERIFIED_ZIP,
  data
})

export const updateQuote = (quote) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATING_QUOTE_INFO });

    return Axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        dispatch(receiveUpdateQuote(response.data));
      }).catch(error => {
        dispatch(receiveUpdateQuote('error'));
      })
  }
}

const receiveUpdateQuote = (data) => ({
  type: types.UPDATED_QUOTE_INFO,
  data
})
