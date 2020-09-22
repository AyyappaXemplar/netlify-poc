import * as ArrayUtilities from '../utilities/array-utilities'
const initialState = { quote: { drivers: [], vehicles: [] } }

const data = (state = initialState, action) => {

  switch (action.type) {
    case 'CREATING_QUOTE':
      return state
    case 'CREATED_QUOTE':
      let { vehicles, drivers } = state.quote
      return { quote: { ...action.data, vehicles, drivers } }
    case 'UPDATED_QUOTE':
      return { quote: { ...action.data, ...state.quote } }
    case 'RATED_QUOTE':
      return { ...state, quote: action.data }
    case 'CREATED_VEHICLE':
      let vehicle = action.data
      let quote = { ...state.quote, vehicles: [...state.quote.vehicles, vehicle] }
      return { quote }
    case 'UPDATED_VEHICLE':
      let updatedVehicles = ArrayUtilities.arrayUpdateItemById(vehicles, action.data)
      return { quote: { ...state.quote, vehicles: updatedVehicles } }
    case 'DELETED_VEHICLE':
      const { id } = action
      vehicles = state.quote.vehicles
      let newVehicles = ArrayUtilities.arrayRemoveItemById(vehicles, id)
      quote = { ...state, vehicles: newVehicles }
      return { quote }
    case 'CREATED_DRIVER':
      const driver = action.data
      drivers = [...state.quote.drivers, driver]
      return { ...state, drivers }
    case 'UPDATED_DRIVER':
      let updatedDrivers = ArrayUtilities.arrayUpdateItemById(state.drivers, action.data)
      quote = { ...state, drivers: updatedDrivers }
      return { quote }
    case 'DELETED_DRIVER':
      let { driverId } = action
      let newDrivers = ArrayUtilities.arrayRemoveItemById(state.quote.drivers, driverId)
      quote = { ...state, drivers: newDrivers }
      return { quote }
    default:
      return state
  }
}

export default data
