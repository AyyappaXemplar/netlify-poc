const initialState = { quote: false, vehicles: [] }

function removeItemById(array, id) {
  return array.filter((item, index) => item.id === id)
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATING_QUOTE':
      return { ...state, quote: false }
    case 'CREATED_QUOTE':
      return { ...state, quote: action.data }
    case 'UPDATED_QUOTE':
      return { ...state, quote: action.data }
    case 'CREATED_VEHICLE':
      const vehicle = action.data
      let vehicles = [...state.vehicles, vehicle]
      return { ...state, vehicles }
    case 'DELETED_VEHICLE':
      const { id } = action
      let newVehicles = removeItemById(state.vehicles, id)
      return { ...state, vehicles: newVehicles }
    default:
      return state
  }
}

export default data
