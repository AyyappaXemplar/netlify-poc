function byInstallmentNumber(a, b) {
  const compareRegex = /(\d+) Installments/
  const installments = [a, b].map(item => item.plan_description.match(compareRegex)[1])
  return installments.reduce((a, b) => (a - b), 0);
}

export function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', {style: 'decimal'}).format(amount);
}

export function monthlyPaymentOption(rate) {
  return rate.payment_options
    .filter(option => option.plan_type === 'monthly')
    .sort(byInstallmentNumber)[0]
}

export function priceDisplay(option) {
  let amount
  if (option.plan_type === 'pay_in_full') {
    amount = option.premium
  } else {
    amount = option.installment_info.amount + option.installment_info.fee
  }
  return formatMoney(Math.ceil(amount/100));
}

export function payInFullOption(rate) {
  return rate.payment_options.find(item => item.plan_type === 'pay_in_full')
}

// Calculate and return the pay in full discount amount
// which is just the total of the monthly - pay in full total
export function payInFullDiscount(rate) {
  let monthlyOption = monthlyPaymentOption(rate);
  let payFullOption = payInFullOption(rate);

  let monthlyDeposit           = monthlyOption.deposit;
  let monthlyInstallmentAmount = monthlyOption.installment_info.amount + monthlyOption.installment_info.fee;

  let monthlyTotal = monthlyDeposit + (monthlyOption.number_of_payments * monthlyInstallmentAmount);
  return monthlyTotal - payFullOption.deposit;
}
