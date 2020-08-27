import Axios from 'axios';
import * as types from '../constants/vehicle-action-types';

const apiBase = process.env.REACT_APP_API_BASE_URL

export const createVehicle = (quoteId, vehicle) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_VEHICLE });

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

export const updateVehicle = (quoteId, vehicleId, vehicleParams) => {
  const quote_id = JSON.parse(localStorage.getItem('siriusQuote')).id

  return (dispatch) => {
    dispatch({ type: types.UPDATING_VEHICLE });

    return Axios.post(`${apiBase}/api/quotes/${quoteId}/vehicles/${vehicleId}`, vehicleParams)
      .then(response => {
        dispatch(receiveUpdateVehicleResponse(response.data));
      }).catch(error => {
        dispatch(receiveUpdateVehicleResponse('error'));
      })
  }
}

const receiveUpdateVehicleResponse = (data) => ({
  type: types.UPDATED_VEHICLE,
  data
})
