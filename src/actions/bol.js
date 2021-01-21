import { createAction } from '@reduxjs/toolkit'

import * as bolTypes       from '../constants/bol-action-types';

import { updateQuote }   from './quotes'
import { updateDriver }  from './drivers'
import { updateVehicle } from './vehicles'

const setBolStatus = createAction(bolTypes.SET_BOL_STATUS)

export const updatePolicyDetails = (quoteParams, driverId, driverParams) => {
  return dispatch => {
    dispatch(setBolStatus('Updating policy details'))

    return dispatch(updateQuote(quoteParams))
      .then(() => {
        dispatch(setBolStatus('Updating policy holder details'))
        return dispatch(updateDriver(driverId, driverParams))
      })
      .then(() => dispatch(setBolStatus('')))
  }
}

export const updatePolicyVehicle = (vehicleId, vehicleParams) => {
  return dispatch => {
    dispatch(setBolStatus('Updating policy vehicle'))

    return dispatch(updateVehicle(vehicleId, vehicleParams))
      .then(() => dispatch(setBolStatus('')))
  }
}

export const updateCoverageForVehicles = (vehicles) => {
  return dispatch => {
    dispatch(setBolStatus('Updating policy details'))
    vehicles.forEach(vehicle => {
      dispatch(updateVehicle(vehicle.id, vehicle))
    })
    dispatch(setBolStatus(''))
  }
}
