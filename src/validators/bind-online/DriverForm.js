import * as dayjs                     from 'dayjs';
import * as validate                  from 'validate.js';

import {validateLicense}               from './LicenseNumber';

validate.validators.policyholderNotExcluded = (included, options, key, attributes) => {
  if (!included && attributes.policyholder) {
    return "^Policyholder must be included in policy"
  }
}

validate.validators.validViolations = (included, options, key, attributes) => {
  if (!attributes.accident_violations) return

  function violationInvalid({type, date}) {
    return [type, date].some(value => !value)
  }
  if (attributes.accident_violations.length & attributes.accident_violations.some(violationInvalid)) {
    return "^Violations info is incomplete"
  }
}

validate.validators.validLicenseNumber = (included, options, key, attributes) => { 
  return validateLicense( included, options, key, attributes );
}


validate.validators.validateDateOfBirth = (included, options, key, attributes) => {
  if(!attributes.birthday) return "need a date of birth"
  
}

validate.validators.validateLicenseDatePresence = (included, options, key, attributes) => {
  if(!attributes.license_issued_at) return "need a license issued date"
 }

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: (value, options) => {
    if (validate.isString(value)) {
      const parsed = dayjs(value, 'YYYY-MM-DD').unix() * 1000
      return parsed
    } else {
      return value * 1000
    }
  },

  // Input is a unix timestamp
  format: (value, options) => {
    if (validate.isString(value)) {
      return dayjs(value, 'YYYY-MM-DD').format('YYYY-MM-DD')
    } else {
      return dayjs.unix(value).format('YYYY-MM-DD')
    }
  }
});

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
  license_state: {
    presence: {allowEmpty: false}
  },

  date_of_birth: {
    presence: { allowEmpty: false },
    validateDateOfBirth: true
  },
  license_issued_date: {
    presence: { allowEmpty: false },
    validateLicenseDatePresence: true
  },
  
  // license_number: (value, attributes) => {
    
  //   const isLicenseNumberValid = validateLicense(attributes.license_state, value);

  //   let validations = { presence: { allowEmpty: false } }
  
  //   validations.format = { pattern: "", flags: "i", message: isLicenseNumberValid }

  //   return validations

  // },
  license_issued_at: (value, attributes) => {
    return {
      datetime: {
        earliest: dayjs(attributes.birthday, 'YYYY-MM-DD').add(16, 'year').unix(),
        message: "^You needed to be at least 16 years when your license was issued"
      }
    }
  },
  requires_sr22: {
    presence: {allowEmpty: false}
  },
  sr22_state: (value, attributes) => {
    if (attributes.requires_sr22) {
      return {presence: {allowEmpty: false}}
    }
    return false
  },
  accident_violations: {
    validViolations: true
  },
  license_number: {
    validLicenseNumber: true
  },
  defensive_driver_course_completed_at: (value, attributes) => {
    if (attributes.defensive_driver) {
      return {presence: {allowEmpty: false}}
    }
    return false
  },
}

export default function validateDriver(driver) {
  return validate(driver, driverFormValidator)
};


