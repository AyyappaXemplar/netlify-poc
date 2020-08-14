const initialState = { exampleProperty: "Initial" }

const state = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      const { exampleProperty } = action
      return { ...state, exampleProperty };
    case 'RESET_STATE':
      return initialState
    default:
      return state
  }
}

export default state
