const initialState = { alert: false, verifyingZip: false, creatingVehicle: false,
                       displayProgressBar: true, gettingQuote: false, lookingUpZipCode: false,
                       emailingQuote: false }

const state = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      const { alert } = action
      return { ...state, alert };
    case 'RESET_ALERT':
      return { ...state, alert: false}
    case 'GETTING_QUOTE':
      return { ...state, gettingQuote: true, displayProgressBar: false }
    case 'RECEIVING_QUOTE':
      return { ...state, gettingQuote: false, displayProgressBar: true }
    case 'SEARCHING_ZIP_CODE':
      return { ...state, lookingUpZipCode: true }
    case 'SEARCHED_ZIP_CODE':
      return { ...state, lookingUpZipCode: false }
    case 'CREATING_QUOTE':
      return { ...state, verifyingZip: true }
    case 'CREATED_QUOTE':
      return { ...state, verifyingZip: false }
    case 'UPDATING_QUOTE':
      return { ...state, updatingQuoteInfo: true }
    case 'UPDATED_QUOTE':
      return { ...state, updatingQuoteInfo: false }
    case 'EMAILING_QUOTE':
      return { ...state, emailingQuote: true }
    case 'EMAILED_QUOTE':
      return { ...state, emailingQuote: false }
    case 'RATING_QUOTE':
      return { ...state, ratingQuote: true }
    case 'RATED_QUOTE':
      return { ...state, ratingQuote: false }
    case 'PURCHASING_QUOTE':
      return { ...state, purchasingQuote: true }
    case 'PURCHASED_QUOTE':
      return { ...state, purchasingQuote: false }
    case 'GETTING_ALL_CARRIERS_INFO':
      return { ...state, gettingCarriersInfo: true }
    case 'RECEIVED_ALL_CARRIERS_INFO':
      return { ...state, gettingCarriersInfo: false }
    case 'CREATING_VEHICLE':
      return { ...state, creatingVehicle: true }
    case 'CREATED_VEHICLE':
      return { ...state, creatingVehicle: false }
    case 'UPDATING_VEHICLE':
      return { ...state, updatingVehicle: true }
    case 'UPDATED_VEHICLE':
      return { ...state, updatingVehicle: false }
    case 'UPDATING_VEHICLE_COVERAGE':
      return { ...state, updatingVehicleCoverage: true }
    case 'UPDATED_VEHICLE_COVERAGE':
      return { ...state, updatingVehicleCoverage: false }
    case 'DELETING_VEHICLE':
      return { ...state, deletingVehicle: true }
    case 'DELETED_VEHICLE':
      return { ...state, deletedVehicle: false }
    case 'CREATING_DRIVER':
      return { ...state, creatingDriver: true }
    case 'CREATED_DRIVER':
      return { ...state, creatingDriver: false }
    case 'UPDATING_DRIVER':
      return { ...state, updatingDriver: true }
    case 'UPDATED_DRIVER':
      return { ...state, updatingDriver: false }
    default:
      return state
  }
}

export default state
