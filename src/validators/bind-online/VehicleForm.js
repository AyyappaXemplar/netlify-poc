const vehicleFormValidator = {
  vin: {
    format: {
      pattern: /.{17}/,
      message: 'need to have 17 characters'
    }
  },
  use_code: {
    presence: {
      message: 'is required'
    }
  },
  current_mileage: {
    numericality: {
      greaterThan: 0,
      noStrings: true
    }
  }
}

export default vehicleFormValidator;
