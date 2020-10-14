import * as ArrayUtilities from '../utilities/array-utilities'
import * as coverages from '../services/coverages'

const initialState = {
  quote: {
    drivers: [], vehicles: []
  },
  coverages: { codes: coverages.allCoverages, groupedByType: coverages.groupedCoverages }
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVING_QUOTE':
      return { ...state, quote: action.data }
    case 'CREATED_QUOTE': {
      // TODO: the state should not be hardcoded, quote response should include state.
      action.data.state = 'IL'
      return { ...state, quote: action.data }
    }
    case 'UPDATED_QUOTE': {
      return { ...state, quote: { ...action.data, ...state.quote } }
    }
    case 'RATED_QUOTE': {
      return { ...state, rates: action.data }
    }
    case 'CREATED_VEHICLE': {
      let vehicle = action.data
      let vehicles = [...state.quote.vehicles, vehicle]
      let quote = { ...state.quote, vehicles }
      return { ...state, quote }
    }
    case 'UPDATED_VEHICLE': {
      let { vehicles } = state.quote
      vehicles = ArrayUtilities.arrayUpdateItemById(vehicles, action.data)
      return { ...state, quote: { ...state.quote, vehicles } }
    }
    case 'DELETED_VEHICLE': {
      let { id } = action
      let { vehicles } = state.quote
      vehicles = ArrayUtilities.arrayRemoveItemById(vehicles, id)
      return { ...state, quote: { ...state.quote, vehicles } }
    }
    case 'CREATED_DRIVER': {
      const driver = action.data
      let drivers = [...state.quote.drivers, driver]
      return { ...state, quote: { ...state.quote, drivers } }
    }
    case 'UPDATED_DRIVER': {
      let drivers = ArrayUtilities.arrayUpdateItemById(state.quote.drivers, action.data)
      let quote = { ...state.quote, drivers }
      return { ...state, quote }
    }
    case 'DELETED_DRIVER': {
      let { driverId } = action
      let newDrivers = ArrayUtilities.arrayRemoveItemById(state.quote.drivers, driverId)
      let quote = { ...state.quote, drivers: newDrivers }
      return { ...state, quote }
    }
    default:
      return state
  }
}

export default data
