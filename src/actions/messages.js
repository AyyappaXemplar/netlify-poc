import * as types from "../constants/messages";

export const addMessage = (message) => {
  return {
    type: types.ADD_MESSAGE,

    payload: message,
  };
};
