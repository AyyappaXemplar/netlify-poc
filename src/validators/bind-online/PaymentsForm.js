import payment from 'payment';
const validate = require("validate.js");

validate.validators.ccNumberValidator = (included, options, key, attributes) => { 
  var valid = payment.fns.validateCardNumber(attributes.credit_card.number);
  if (!valid) {
    return "-cc number not valid"
  }
  else { 
    return valid
  }
}


validate.validators.ccExpirationValidator = (included, options, key, attributes) => {

  console.log(attributes)

  const isExpirationValid = payment.fns.validateCardExpiry(attributes.credit_card.exp_month, attributes.credit_card.exp_year)

  if (!isExpirationValid) {
    return "-Card expiration date not valid"
  }
  else { 
    return isExpirationValid
  }
  return 
}


const paymentsValidator = {
  // 'credit_card.cvv': function (value, attributes, attributeName, options, constraints) {
  //   if (options.paymentMethod === 'credit_card') {
  //     const pattern = /\d{3,4}/
  //     return {
  //       format: { pattern },
  //     }
  //   } else {
  //     return false
  //   }
  // },
  cc_number: {
    ccNumberValidator: true
  },

  cc_expiration: {
    ccExpirationValidator: true
  }
}

export default function validatePolicyDetails(paymentParams, options) {
  return validate(paymentParams, paymentsValidator, options)
};
