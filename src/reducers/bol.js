const initialState = { status: null }

const bol = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOL_STATUS':
      return { ...state, status: action.payload };
    default:
      return state
  }
}

export default bol
