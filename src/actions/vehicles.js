import Axios from 'axios';
import * as types from '../constants/vehicle-action-types';

const apiBase = process.env.REACT_APP_API_BASE_URL

export const createVehicle = (quoteId, vehicle) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_VEHICE });

    return Axios.post(`${apiBase}/api/quotes/${quoteId}/vehicles`, vehicle)
      .then(response => {
        dispatch(createQuoteResponse(response.data));
      }).catch(e => {
        const error = e.response.data.errors[0]
        dispatch(createVehicleResponse({ error }));
      })
  }
}

const createVehicleResponse = (data) => ({
  type: types.CREATED_VEHICLE,
  data
})

export const updateQuote = (quoteId, vehicleId, vehicle) => {
  const quote_id = JSON.parse(localStorage.getItem('siriusQuote')).id

  return (dispatch) => {
    dispatch({ type: types.UPDATING_QUOTE });

    return Axios.post(`${apiBase}/api/quotes/${quoteId}/vehicles/${vehicleId}`, vehicle)
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
