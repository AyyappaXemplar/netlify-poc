import Axios from 'axios';
import * as types from '../constants/data-action-types';


export const createQuote = (zipCode) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_QUOTE });

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
  type: types.CREATED_QUOTE,
  data
})

export const updateQuote = (quote) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATING_QUOTE });

    return Axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        dispatch(receiveUpdateQuote(response.data));
      }).catch(error => {
        dispatch(receiveUpdateQuote('error'));
      })
  }
}

const receiveUpdateQuote = (data) => ({
  type: types.UPDATED_QUOTE,
  data
})
