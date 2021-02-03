import { createAction } from '@reduxjs/toolkit'

import Axios               from '../config/axios';
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
      .catch(error => dispatch(setBolStatus('error')))
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
    dispatch(setBolStatus('Updating vehicle coverages'))

    const convertVehicleToPromise = vehicle => dispatch(updateVehicle(vehicle.id, vehicle))
    return Axios.all(vehicles.map(convertVehicleToPromise))
      .then(resp => dispatch(setBolStatus('')))
  }
}
