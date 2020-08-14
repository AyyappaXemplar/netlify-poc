const initialState = null


const data = (state = initialState, action) => {
  switch (action.type) {
    case 'GETTING_DATA':
      return initialState;
    case 'RECEIVED_DATA':
      return { ...state, ...action.data }
    default:
      return state
  }
}

export default data
