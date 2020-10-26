import * as ArrayUtilities from '../utilities/array-utilities'
import * as coverages      from '../services/coverages'


const initialState = {
  quote: {
    drivers: [], vehicles: []
  },
  coverages: { codes: coverages.allCoverages, groupedByType: coverages.groupedCoverages },
  rates: [], addressOptions: []
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVING_QUOTE':
      return { ...state, quote: action.data }
    case 'SEARCHING_ZIP_CODE':
      return { ...state, addressOptions: [] }
    case 'SEARCHED_ZIP_CODE':
      return { ...state, addressOptions: action.data }
    case 'CREATED_QUOTE': {
      return { ...state, quote: action.data }
    }
    case 'UPDATED_QUOTE': {
      return { ...state, quote: { ...action.data, ...state.quote } }
    }
    case 'RATING_QUOTE': {
       return {...state, carrier: false }
    }
    case 'RATED_QUOTE': {
      let rates
      if (action.data.error) {
         rates = action.data
      } else {
        rates = []
        rates.push(action.data.best_match)
        rates.push(...action.data.other_rates)
      }
      return { ...state, rates }
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
