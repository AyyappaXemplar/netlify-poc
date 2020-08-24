const initialState = { alert: false, verifyingZip: false, progress: "START" }

const state = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      const { alert } = action
      return { ...state, alert };
    case 'SET_PROGRESS':
      const { progress } = action
      return { ...state, progress };
    case 'RESET_ALERT':
      return { ...state, alert: false}
    case 'CREATING_QUOTE':
      return { ...state, verifyingZip: true }
    case 'CREATED_QUOTE':
      return { ...state, verifyingZip: false }
    case 'UPDATING_QUOTE':
      return { ...state, updatingQuoteInfo: true }
    case 'UPDATED_QUOTE':
      return { ...state, updatingQuoteInfo: false }
    default:
      return state
  }
}

export default state
