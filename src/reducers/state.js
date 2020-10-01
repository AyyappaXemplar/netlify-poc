const initialState = { alert: false, verifyingZip: false, creatingVehicle: false,
                       progress: "START", displayProgressBar: true, gettingQuote: false }

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
    case 'CREATING_QUOTE':
      return { ...state, verifyingZip: true }
    case 'CREATED_QUOTE':
      return { ...state, verifyingZip: false }
    case 'UPDATING_QUOTE':
      return { ...state, updatingQuoteInfo: true }
    case 'UPDATED_QUOTE':
      return { ...state, updatingQuoteInfo: false }
    case 'RATING_QUOTE':
      return { ...state, ratingQuote: true }
    case 'RATED_QUOTE':
      return { ...state, ratingQuote: false }
    case 'CREATING_VEHICLE':
      return { ...state, creatingVehicle: true }
    case 'CREATED_VEHICLE':
      return { ...state, creatingVehicle: false }
    case 'UPDATING_VEHICLE':
      return { ...state, updatingVehicle: true }
    case 'UPDATED_VEHICLE':
      return { ...state, updatingVehicle: false }
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
