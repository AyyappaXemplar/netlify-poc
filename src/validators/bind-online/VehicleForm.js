const validate = require("validate.js");

const lienholderValidationFn = (value, attributes, attributeName, options) => {
  if (validate.isObject(attributes.lienholder)) {
    return { presence: {allowEmpty: false} }
  }
}

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
  },
  estimated_annual_distance: {
    numericality: {
      greaterThan: 0,
      noStrings: true
    }
  },
  // TODO: uncomment this code when this field is ready
  // miles_travelled_one_way: (value, attributes) => {
  //   if (['Errands'].include(attributes.use_code)) {
  //     return { numericality: {
  //       greaterThan: 0,
  //       noStrings: true
  //       }
  //     }
  //   }
  // },
  'lienholder.name': lienholderValidationFn,
  'lienholder.address.line1': lienholderValidationFn,
  'lienholder.address.city': lienholderValidationFn,
  'lienholder.address.state': lienholderValidationFn,
  'lienholder.address.zip_code': lienholderValidationFn,
}


export default function validateDriver(driver, options = true) {
  return validate(driver, vehicleFormValidator, options)
};
