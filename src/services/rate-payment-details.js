import { formatMoney } from './payment-options';

export function getAmount(option) { Math.ceil((option.installment_info.amount + option.installment_info.fee) / 100) }

export function getDeposit(option) { formatMoney(Math.ceil(option.deposit / 100)) }

export function getInstallmentFee(option) { formatMoney(Math.ceil(option.installment_info.fee / 100)) }

