import * as ArrayUtilities      from '../utilities/array-utilities'
import * as coverages           from '../services/coverages'
import getCheapestRateByCarrier from '../services/rate-filter'


const initialState = {
  quote: {
    drivers: [], vehicles: []
  },
  coverages: { codes: coverages.allCoverages, groupedByType: coverages.groupedCoverages },
  rates: [], addressOptions: [], carriers: []
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_DATA': {
      return initialState
    }
    case 'RECEIVING_QUOTE':
      return { ...state, quote: action.data }
    case 'SEARCHING_ZIP_CODE':
    case 'RESET_ADDRESS_OPTIONS':
      return { ...state, addressOptions: [] }
    case 'SEARCHED_ZIP_CODE':
      return { ...state, addressOptions: action.data }
    case 'CREATED_QUOTE': {
      return { ...state, quote: action.data }
    }
    case 'UPDATED_QUOTE': {
      return { ...state, quote: { ...state.quote, ...action.data } }
    }
    case 'RATING_QUOTE': {
      console.log("state.rates: ", state.rates);
      if (state.rates.error) {
        return { ...state, rates: [] }
      } else {
        // TODO: determine what to do here (keep rate, check if expired...)
        return { ...state }
      }
    }
    case 'RATED_QUOTE': {
      let rates
      console.log("action: ", action);
      if (action.data.errors) {
         rates = action.data
      } else {
        rates = [action.data.best_match, ...action.data.other_rates]
        rates = getCheapestRateByCarrier(rates)
      }
      return { ...state, rates }
    }
    case 'RECEIVED_ALL_CARRIERS_INFO': {
      return { ...state, carriers: action.data }
    }
    case 'CREATED_VEHICLE': {
      let vehicle = action.data
      let vehicles = [...state.quote.vehicles, vehicle]
      let quote = { ...state.quote, vehicles }
      return { ...state, quote, rates: [] }
    }
    case 'UPDATED_VEHICLE': {
      let { vehicles } = state.quote
      vehicles = ArrayUtilities.arrayUpdateItemById(vehicles, action.data)
      return { ...state, quote: { ...state.quote, vehicles }, rates: [] }
    }
    case 'UPDATED_VEHICLE_COVERAGE': {
      let { vehicles } = state.quote
      vehicles = ArrayUtilities.arrayUpdateItemById(vehicles, action.data)
      // in this action, rate has been updated aldready, no need to remove it
      return { ...state, quote: { ...state.quote, vehicles } }
    }
    case 'DELETED_VEHICLE': {
      let { id } = action
      let { vehicles } = state.quote
      vehicles = ArrayUtilities.arrayRemoveItemById(vehicles, id)
      return { ...state, quote: { ...state.quote, vehicles }, rates: [] }
    }
    case 'CREATED_DRIVER': {
      const driver = action.data
      let drivers = [...state.quote.drivers, driver]
      return { ...state, quote: { ...state.quote, drivers }, rates: [] }
    }
    case 'UPDATED_DRIVER': {
      let drivers = ArrayUtilities.arrayUpdateItemById(state.quote.drivers, action.data)
      let quote = { ...state.quote, drivers }
      return { ...state, quote, rates: [] }
    }
    case 'DELETED_DRIVER': {
      let { driverId } = action
      let newDrivers = ArrayUtilities.arrayRemoveItemById(state.quote.drivers, driverId)
      let quote = { ...state.quote, drivers: newDrivers }
      return { ...state, quote, rates: [] }
    }
    default:
      return state
  }
}

export default data
