const validate = require("validate.js");


const policyDetailsFormValidator = {
  'term.effective': {numericality: true},
  'term.expires':   {numericality: true},
  'term.duration':  {numericality: true},
  'address.line1': { presence: {allowEmpty: false} },
  'address.state': { presence: {allowEmpty: false} },
  'address.city':  { presence: {allowEmpty: false} },
  'address.zip_code': { presence: {allowEmpty: false} },
  first_name: { presence: {allowEmpty: false} },
  last_name:  { presence: {allowEmpty: false} },
  phone: {format: {pattern: /\(?\d{3}\)?\s?-?\d{3}\s?-?\d{4}/} },
  email: {email: true},
  communication_preference: { presence: {allowEmpty: false} }
}

export default function validatePolicyDetails(params) {
  return validate(params, policyDetailsFormValidator)
};
