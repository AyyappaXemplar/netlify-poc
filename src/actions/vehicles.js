import Axios      from '../config/axios';
import * as types from '../constants/vehicle-action-types';
import { rateQuote } from './rates'
import {encryptData} from '../config/aes_encryptor';

export const createVehicle = (vehicle) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_VEHICLE });

    const quoteId = localStorage.getItem('siriusQuoteId')
    if (!quoteId) return dispatch(receiveVehicleResponse({ error: 'Quote Id not found' }));

    const {encryptedData, ivString} = encryptData(vehicle);

    console.log("reqData", encryptedData);
    console.log("iv", ivString);
    console.log("------")
    
    return Axios.post(`/quotes/${quoteId}/vehicles`, {encryptedData,ivString})
      .then(response => {
        console.log("response createVehicle", response);
        dispatch(receiveVehicleResponse(response));
      }).catch(e => {
        console.log("error response for vehicles", e);
        console.log(e.response);
        if (typeof(e.response.data) === 'string'){
          dispatch(receiveVehicleResponse({ error: e.response.data }));
          return null;
        }
        const error = e.response.data.errors[0]
        let message
        if (error.attribute || error.message) {
          message = `${error.attribute} ${error.message}`
        } else {
          message = 'There was an error adding a vehicle'
        }
        dispatch(receiveVehicleResponse({ error: message }));
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
    const {encryptedData, ivString} = encryptData(vehicleParams);
    return Axios.patch(`/quotes/${quoteId}/vehicles/${vehicleId}`, {encryptedData, ivString})
      .then(response => {
        console.log("response updateVehicle method", response);
        dispatch(receiveUpdateVehicleResponse(response));
      }).catch(error => {
        dispatch(receiveUpdateVehicleResponse('error'));
      })
  }
}

export const updateVehicleCoverages = (vehicle, coverageLevel) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch, getState) => {
    dispatch({ type: types.UPDATING_VEHICLE_COVERAGE });

    let { coverages } = getState().data

    coverages = coverages.groupedByType[coverageLevel]

    vehicle.coverages = coverages
    vehicle.coverage_package_name = coverageLevel

    const {encryptedData, ivString} = encryptData(vehicle);

    return Axios.patch(`/quotes/${quoteId}/vehicles/${vehicle.id}`, {encryptedData, ivString})
      .then(response => {
        console.log("response vehicle.js", response);
        dispatch(rateQuote())
          .then(() => dispatch(receiveUpdateVehicleCoverageResponse(response)))
      })
      .catch(error => {
        dispatch(receiveUpdateVehicleCoverageResponse({ error: 'There was an error updating your vehicle coverage'}));
      })
  }
}

const receiveUpdateVehicleResponse = (data) => ({
  type: types.UPDATED_VEHICLE,
  data
})

const receiveUpdateVehicleCoverageResponse = (data) => ({
  type: types.UPDATED_VEHICLE_COVERAGE,
  data
})

export const deleteVehicle = (vehicleId) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch) => {
    dispatch({ type: types.DELETING_VEHICLE });
    return Axios.delete(`/quotes/${quoteId}/vehicles/${vehicleId}`)
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
