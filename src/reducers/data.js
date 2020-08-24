const initialState = { quoteId: false }


const data = (state = initialState, action) => {
  switch (action.type) {
    case 'VERIFYING_ZIP':
      return { ...state, quoteId: false }
    case 'VERIFIED_ZIP':
      return { ...state, quoteId: action.data }
    case 'UPDATED_QUOTE_INFO':
      const { quote } = action.data
      return { ...state, quote }
    default:
      return state
  }
}

export default data
