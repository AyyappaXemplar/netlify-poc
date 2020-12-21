const initialState = { messages: [] }

const state = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { messages: [...state.messages, action.payload] }
    default:
      return state
  }
}

export default state
