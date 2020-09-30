import Axios from 'axios';
import * as types from '../constants/driver-action-types';

const apiBase = process.env.REACT_APP_API_BASE_URL
const namespace = process.env.REACT_APP_API_NAMESPACE

export const createDriver = (driver) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_DRIVER });

    const quoteId = localStorage.getItem('siriusQuoteId')
    if (!quoteId) return dispatch(receiveDriverResponse({ error: 'Quote Id not found' }));


    return Axios.post(`${apiBase}/${namespace}/quotes/${quoteId}/drivers`, driver)
      .then(response => {
        dispatch(receiveDriverResponse(response.data));
      }).catch(e => {
        // const error = e.response.data.errors[0]
        dispatch(receiveDriverResponse({ error: 'there was an error' }));
      })
  }
}

const receiveDriverResponse = (data) => ({
  type: types.CREATED_DRIVER,
  data
})

export const updateDriver = (driverId, driverParams) => {
  const quoteId = localStorage.getItem('siriusQuote')

  return (dispatch) => {
    dispatch({ type: types.UPDATING_DRIVER });

    return Axios.post(`${apiBase}/${namespace}/quotes/${quoteId}/drivers/${driverId}`, driverParams)
      .then(response => {
        dispatch(receiveUpdateDriverResponse(response.data));
      }).catch(error => {
        dispatch(receiveUpdateDriverResponse('error'));
      })
  }
}

const receiveUpdateDriverResponse = (data) => ({
  type: types.UPDATED_DRIVER,
  data
})

export const deleteDriver = (driverId) => {
  const quoteId = localStorage.getItem('siriusQuote')

  return (dispatch) => {
    dispatch({ type: types.DELETING_DRIVER });
    return Axios.delete(`${apiBase}/${namespace}/quotes/${quoteId}/drivers/${driverId}`)
      .then(response => {
        dispatch(receiveDeleteDriverResponse(driverId));
      }).catch(error => {
        dispatch(receiveDeleteDriverResponse('error'));
      })
  }
}

const receiveDeleteDriverResponse = (driverId) => ({
  type: types.DELETED_DRIVER,
  driverId
})

