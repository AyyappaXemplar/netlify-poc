const initialState = { exampleProperty: "Initial", alert: null }

const state = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      const { exampleProperty } = action
      return { ...state, exampleProperty };
    case 'SET_ALERT':
      const { alert } = action
      return { ...state, alert };
    case 'RESET_STATE':
      return initialState
    default:
      return state
  }
}

export default state
