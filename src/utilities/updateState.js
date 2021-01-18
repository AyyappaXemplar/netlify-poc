const updateState = (prevState, event, key) => {
    const newState = { ...prevState };
    newState[key] = event.target.value;
    console.log(newState);
    return newState;
  };


export default updateState;