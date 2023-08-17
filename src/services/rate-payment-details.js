import { formatMoney } from './payment-options';

export function getAmount(option) {
  return Math.ceil((option.installment_info.amount + option.installment_info.fee) / 100)
}

export function getDeposit(option) {
  return Math.ceil(option.deposit / 100)
}

export function getInstallmentFee(option) {
  return formatMoney(Math.ceil(option.installment_info.fee / 100))
}

export function getTotalFees(option) {
  return Math.ceil((option.number_of_payments * option.installment_info.fee) / 100)
}
