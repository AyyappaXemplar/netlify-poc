const initialState = { quote: false, vehicles: [], drivers: [] }

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
      let updatedVehicles = arrayUpdateItemById(state.vehicles, action.data)
      return { ...state, vehicles: updatedVehicles }
    case 'DELETED_VEHICLE':
      const { id } = action
      let newVehicles = arrayRemoveItemById(state.vehicles, id)
      return { ...state, vehicles: newVehicles }
    case 'CREATED_DRIVER':
      const driver = action.data
      let drivers = [...state.drivers, driver]
      return { ...state, drivers }
    case 'UPDATED_DRIVER':
      let updatedDrivers = arrayUpdateItemById(state.drivers, action.data)
      return { ...state, drivers: updatedDrivers }
    case 'DELETED_DRIVER':
      let { driverId } = action
      let newDrivers = arrayRemoveItemById(state.drivers, driverId)
      return { ...state, drivers: newDrivers }
    default:
      return state
  }
}

export default data
