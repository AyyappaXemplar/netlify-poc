const initialState = { quoteId: false }


const data = (state = initialState, action) => {
  switch (action.type) {
    case 'VERIFYING_ZIP':
      return { ...state, quoteId: false }
    case 'VERIFIED_ZIP':
      return { ...state, quoteId: action.data }
    default:
      return state
  }
}

export default data
