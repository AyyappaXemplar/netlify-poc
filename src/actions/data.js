import Axios from 'axios';
import * as types from '../constants/data-action-types';


export const getData = () => {
  return (dispatch) => {
    dispatch({ type: types.GETTING_DATA });

    return Axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        dispatch(receiveData(response.data));
      }).catch(error => {
        console.log('error: ', error)
      })
  }
}

const receiveData = (data) => ({
  type: types.RECEIVED_DATA,
  data
})
