import Axios from 'axios';
import * as types from '../constants/data-action-types';


export const verifyZip = (zipCode) => {
  return (dispatch) => {
    dispatch({ type: types.VERIFYING_ZIP });

    return Axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        debugger
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
