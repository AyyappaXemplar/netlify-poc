import * as types from '../constants/state-action-types';

export const setAlert = alert => ({
  type: types.SET_ALERT,
  alert
})
