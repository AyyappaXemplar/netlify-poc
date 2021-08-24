import Axios      from '../config/axios';
import * as types from '../constants/vehicle-action-types';
import { rateQuote } from './rates'
import { updateQuote } from "./quotes"

export const createVehicle = (vehicle) => {
  return (dispatch) => {
    dispatch({ type: types.CREATING_VEHICLE });

    const quoteId = localStorage.getItem('siriusQuoteId')
    if (!quoteId) return dispatch(receiveVehicleResponse({ error: 'Quote Id not found' }));


    return Axios.post(`/quotes/${quoteId}/vehicles`, vehicle)
      .then(response => {
        dispatch(receiveVehicleResponse(response.data));
      }).catch(e => {
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

    return Axios.patch(`/quotes/${quoteId}/vehicles/${vehicleId}`, vehicleParams)
      .then(response => {
        dispatch(receiveUpdateVehicleResponse(response.data));
      }).catch(error => {
        dispatch(receiveUpdateVehicleResponse('error'));
      })
  }
}

export const updateVehicleCoverages = (vehicle, coverageLevel, quote, quote_number, payment_plan_code) => {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (dispatch, getState) => {
    dispatch({ type: types.UPDATING_VEHICLE_COVERAGE });

    let { coverages } = getState().data

    coverages = coverages.groupedByType[coverageLevel]

    vehicle.coverages = coverages
    vehicle.coverage_package_name = coverageLevel

    return Axios.patch(`/quotes/${quoteId}/vehicles/${vehicle.id}`, vehicle)
      .then(response => {
        dispatch(rateQuote())
          .then(() => dispatch(receiveUpdateVehicleCoverageResponse(response.data)))
      })
      // Tried updating quote here
      // .finally(() => updateQuote({ ...quote, quote_number, payment_plan_code }))
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
