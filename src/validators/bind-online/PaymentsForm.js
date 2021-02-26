import payment from 'payment';
const validate = require("validate.js");

validate.validators.ccNumberValidator = (included, options, key,attributes) => {
  if (attributes.credit_card) {
    var valid = payment.fns.validateCardNumber(attributes.credit_card.number);
    if (!valid) {
      return "-cc number not valid";
    } else {
      return null;
    }
  }
  else { 
    return null
  }
};


validate.validators.ccExpirationValidator = (included, options, key, attributes) => {
  if (attributes.credit_card) {
    const isExpirationValid = payment.fns.validateCardExpiry(attributes.credit_card.exp_month, attributes.credit_card.exp_year)

    if (!isExpirationValid) {
      return "- expiration date not valid"
    }
    else {
      return null
    }
  }
  else { 
    return null
  }
    
}

validate.validators.cvcValidator = (included, options, key, attributes) => {
  if (attributes.credit_card) {
    const isCVvvValid = payment.fns.validateCardCVC(attributes.credit_card.cvv)

    if (!isCVvvValid) {
      return 'CVC code is invalid'
    }
    else {
      return null
    }
  }
  else { 
    return null
  }

  
  
}



const paymentsValidator = {

  cc_number: {
    ccNumberValidator: true
  },

  cc_expiration: {
    ccExpirationValidator: true
  },
  cc_cvv: {
    cvcValidator: true
  },

  // 'bankAccountValidation': function (value, attributes, attributeName, options, constraints) {
  //   // if (options.paymentMethod === 'credit_card') {
  //   //   const pattern = /\d{3,4}/
  //   //   return {
  //   //     format: { pattern },
  //   //   }
  //   // } else {
  //   //   return false
  //   // }
  // }
}

export default function validatePolicyDetails(paymentParams, options) {
  return validate(paymentParams, paymentsValidator, options)
};
