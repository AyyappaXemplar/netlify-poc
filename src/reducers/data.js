import * as ArrayUtilities from '../utilities/array-utilities'
import coverages from '../server/coverages'
const initialState = {
  quote: {
    drivers: [], vehicles: []
  },
  coverages
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATING_QUOTE': {
      return state
    }
    case 'CREATED_QUOTE': {
      let { vehicles, drivers } = state.quote
      return { quote: { ...action.data, vehicles, drivers } }
    }
    case 'UPDATED_QUOTE': {
      return { quote: { ...action.data, ...state.quote } }
    }
    case 'RATED_QUOTE': {
      return { ...state, quote: action.data }
    }
    case 'CREATED_VEHICLE': {
      let vehicle = action.data
      let vehicles = [...state.quote.vehicles, vehicle]
      let quote = { ...state.quote, vehicles }
      return { quote }
    }
    case 'UPDATED_VEHICLE': {
      let { vehicles } = state.quote
      vehicles = ArrayUtilities.arrayUpdateItemById(vehicles, action.data)
      return { quote: { ...state.quote, vehicles } }
    }
    case 'DELETED_VEHICLE': {
      let { id } = action
      let { vehicles } = state.quote
      vehicles = ArrayUtilities.arrayRemoveItemById(vehicles, id)
      return { quote: { ...state.quote, vehicles } }
    }
    case 'CREATED_DRIVER': {
      const driver = action.data
      let drivers = [...state.quote.drivers, driver]
      return { quote: { ...state.quote, drivers } }
    }
    case 'UPDATED_DRIVER': {
      let drivers = ArrayUtilities.arrayUpdateItemById(state.quote.drivers, action.data)
      let quote = { ...state.quote, drivers }
      return { quote }
    }
    case 'DELETED_DRIVER': {
      let { driverId } = action
      let newDrivers = ArrayUtilities.arrayRemoveItemById(state.quote.drivers, driverId)
      let quote = { ...state.quote, drivers: newDrivers }
      return { quote }
    }
    default:
      return state
  }
}

export default data
