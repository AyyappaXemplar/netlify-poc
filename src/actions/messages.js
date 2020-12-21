import * as types from '../constants/messages';

export const addMessage = (from, messages) => {
  return {
    type: types.ADD_MESSAGE
    payload: { from, messages }
  }
}
