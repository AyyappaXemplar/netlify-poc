const initialState = { alert: false, verifyingZip: false }

const state = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      const { alert } = action
      return { ...state, alert };
    case 'RESET_ALERT':
      return { ...state, alert: false}
    case 'VERIFYING_ZIP':
      return { ...state, verifyingZip: true }
    case 'VERIFIED_ZIP':
      return { ...state, verifyingZip: false }
    default:
      return state
  }
}

export default state
