import * as types from '../constants/state-action-types';

// example action. TODO: delete when not needed
export const setState = value => ({
  type: types.SET_STATE,
  exampleProperty: value
})

export const setAlert = alert => ({
  type: types.SET_ALERT,
  alert
})
