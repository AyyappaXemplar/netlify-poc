import * as dayjs from 'dayjs';
const validate = require("validate.js");

validate.validators.policyEffectiveDateValidator = function(value, options, key, attributes) {

  const currentDate = dayjs().add(1, "day")
  const effectiveDate = dayjs(attributes.term.effective)
  if (currentDate.diff(effectiveDate, "days") > 0 || currentDate.diff(effectiveDate, "days") >= 30) {
    return "- must start today or in within the next 30 days";
  } else {
    return null;
  }
}

const policyDetailsFormValidator = {
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
  'term.effective': {
    policyEffectiveDateValidator: !null,
    presence: {allowEmpty: false}
  },
  communication_preference: { presence: { allowEmpty: false } }
}

export default function validatePolicyDetails(params) {
  return validate(params, policyDetailsFormValidator)
};
