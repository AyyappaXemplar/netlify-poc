import * as dayjs from 'dayjs';
const validate = require("validate.js");


validate.validators.policyEffectiveDateValidator = (included, options, key, attributes) => {
  const effectiveDate = dayjs(attributes.term.effective);
  if (effectiveDate < dayjs() || effectiveDate > dayjs().add(30, 'days')) {
      return "-must start today or in within the next 30 days";
    } else {
      return null;
    }
}

const policyDetailsFormValidator = {
  'term.effective': { presence: {allowEmpty: false} },
  'term.expires':   { presence: {allowEmpty: false} },
  'term.duration':  {numericality: true},
  'address.line1': { presence: {allowEmpty: false} },
  'address.state': { presence: {allowEmpty: false} },
  'address.city':  { presence: {allowEmpty: false} },
  'address.zip_code': { presence: {allowEmpty: false} },
  first_name: { presence: {allowEmpty: false} },
  last_name:  { presence: {allowEmpty: false} },
  phone: {format: {pattern: /\(?\d{3}\)?\s?-?\d{3}\s?-?\d{4}/} },
  email: {email: true},
  communication_preference: { presence: { allowEmpty: false } },
  policy_effective_date_validator: {
    policyEffectiveDateValidator: true
  }
}

export default function validatePolicyDetails(params) {
  return validate(params, policyDetailsFormValidator)
};
