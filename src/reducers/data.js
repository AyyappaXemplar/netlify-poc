const initialState = { quote: false, vehicles: [] }

function arrayRemoveItemById(array, id) {
  return array.filter((item, index) => item.id !== id)
}

function arrayUpdateItemById(array, updatedItem) {
  return array.map((item, index) => {
    if (item.id !== updatedItem.id) {
      return item
    } else {
      return { ...item, ...updatedItem }
    }
  })
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
    case 'UPDATED_VEHICLE':
      let updatedVehicles = arrayUpdateItemById(state,vehicles, action.data)
      return { ...state, vehicle: updatedVehicles }
    case 'DELETED_VEHICLE':
      const { id } = action
      let newVehicles = arrayRemoveItemById(state.vehicles, id)
      return { ...state, vehicles: newVehicles }
    default:
      return state
  }
}

export default data
