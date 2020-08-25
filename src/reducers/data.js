const initialState = { quote: false }


const data = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATING_QUOTE':
      return { ...state, quote: false }
    case 'CREATED_QUOTE':
      return { ...state, quote: action.data }
    case 'UPDATED_QUOTE':
      const { quote } = action.data
      return { ...state, quote }
    default:
      return state
  }
}

export default data
