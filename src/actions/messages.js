import * as types from "../constants/messages";

export const addMessage = (from, statements) => {
  return {
    type: types.ADD_MESSAGE,
    payload: { from, statements },
  };
};
