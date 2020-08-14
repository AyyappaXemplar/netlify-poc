import * as types from '../constants/state-action-types';


export const setState = value => ({
  type: types.SET_STATE,
  exampleProperty: value
})
