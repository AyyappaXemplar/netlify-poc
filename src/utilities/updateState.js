const updateState = (prevState, event, key) => {
    const newState = { ...prevState };
    newState[key] = event.target.value;
    return newState;
  };


export default updateState;