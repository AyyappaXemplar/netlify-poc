const initialState = { quote: false, vehicles: [] }


const data = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATING_QUOTE':
      return { ...state, quote: false }
    case 'CREATED_QUOTE':
      return { ...state, quote: action.data }
    case 'UPDATED_QUOTE':
      const { quote } = action.data
      return { ...state, quote }
    case 'CREATED_VEHICLE':
      const { vehicle } = action.data
      const vehicles = [...state.vehicles, vehicle]
      return { ...state, vehicles }
    default:
      return state
  }
}

export default data
