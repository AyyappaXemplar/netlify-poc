import Axios from 'axios';
import * as types from '../constants/vehicle-action-types';

const apiBase = process.env.REACT_APP_API_BASE_URL
const namespace = process.env.REACT_APP_API_NAMESPACE
const coverageRangeEnd = { basic: 4, full: 6, comprehensive: undefined }

export const createVehicle = (vehicle) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_VEHICLE });

    const quoteId = localStorage.getItem('siriusQuoteId')
    if (!quoteId) return dispatch(receiveVehicleResponse({ error: 'Quote Id not found' }));


    return Axios.post(`${apiBase}/${namespace}/quotes/${quoteId}/vehicles`, vehicle)
      .then(response => {
        dispatch(receiveVehicleResponse(response.data));
      }).catch(e => {
        // const error = e.response.data.errors[0]
        dispatch(receiveVehicleResponse({ error: 'there was an error' }));
      })
  }
}

const receiveVehicleResponse = (data) => ({
  type: types.CREATED_VEHICLE,
  data
})

export const updateVehicle = (vehicleId, vehicleParams) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch) => {
    dispatch({ type: types.UPDATING_VEHICLE });

    return Axios.patch(`${apiBase}/${namespace}/quotes/${quoteId}/vehicles/${vehicleId}`, vehicleParams)
      .then(response => {
        dispatch(receiveUpdateVehicleResponse(response.data));
      }).catch(error => {
        dispatch(receiveUpdateVehicleResponse('error'));
      })
  }
}

// This is temporary
export const updateVehicleCoverages = (vehicleId, coverageLevel) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch, getState) => {
    dispatch({ type: types.UPDATING_VEHICLE });

    let { coverages } = getState().data
    const coverageEnd = coverageRangeEnd[coverageLevel]
    coverages = coverages.slice(0, coverageEnd)
    const vehicleParams = { coverages }

    return Axios.patch(`${apiBase}/${namespace}/quotes/${quoteId}/vehicles/${vehicleId}`, vehicleParams)
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

export const deleteVehicle = (vehicleId) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch) => {
    dispatch({ type: types.DELETING_VEHICLE });
    return Axios.delete(`${apiBase}/${namespace}/quotes/${quoteId}/vehicles/${vehicleId}`)
      .then(response => {
        dispatch(receiveDeleteVehicleResponse(vehicleId));
      }).catch(error => {
        dispatch(receiveDeleteVehicleResponse('error'));
      })
  }
}

const receiveDeleteVehicleResponse = (id) => ({
  type: types.DELETED_VEHICLE,
  id
})
