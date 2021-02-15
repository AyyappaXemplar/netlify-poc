const validate = require("validate.js");

validate.validators.policyholderNotExcluded = (included, options, key, attributes) => {
  if (!included && attributes.policyholder) {
    return "^Policyholder must be included in policy"
  }
}

const driverFormValidator = {
  first_name: {
    presence: {allowEmpty: false}
  },
  last_name: {
    presence: {allowEmpty: false}
  },
  policy_holder_relationship: {
    presence: {allowEmpty: false}
  },
  marital_status: {
    presence: {allowEmpty: false}
  },
  included_in_policy: {
    presence: {allowEmpty: false},
    policyholderNotExcluded: true
  },
  license_number: (value, attributes) => {
    if (attributes.included_in_policy) {
      return {presence: {allowEmpty: false} }
    }
  },
  license_state: {
    presence: {allowEmpty: false}
  },
  license_type: {
    presence: {allowEmpty: false}
  },
  requires_sr22: {
    presence: {allowEmpty: false}
  },

  sr22_state: (value, attributes, attributeName, options, constraints) => {
    if (attributes.requires_sr22) {
      return {presence: {allowEmpty: false}}
    }
    return false
  }
}

export default function validateDriver(driver) {
  return validate(driver, driverFormValidator)
};


