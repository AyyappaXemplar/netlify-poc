const validate = require("validate.js");


const paymentsValidator = {
  'credit_card.cvv': function (value, attributes, attributeName, options, constraints) {
    if (options.paymentMethod === 'credit_card') {
      const pattern = /\d{3,4}/
      return {
        format: { pattern },
      }
    } else {
      return false
    }
  }
}

export default function validatePolicyDetails(paymentParams, options) {
  return validate(paymentParams, paymentsValidator, options)
};
