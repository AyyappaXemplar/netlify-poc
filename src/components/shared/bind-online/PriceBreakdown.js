import React from "react";
import { monthlyPaymentOption, formatMoney,
                      getMonthlyTotal } from '../../../services/payment-options';
import { getAmount, getDeposit }        from '../../../services/rate-payment-details';


const PriceBreakdown = ({ rate }) => {
  const paymentOption = monthlyPaymentOption(rate)

  const breakdownData = [
    {
      label: "Policy Length",
      value: `${rate.term.duration} months`,
    },
    {
      label: "Down Payment",
      value: `$${formatMoney(getDeposit(paymentOption))}`,
    },
    {
      label: "Monthly Payment",
      value: `$${getAmount(paymentOption)} x ${paymentOption.number_of_payments}`,
    },
    {
      label: "Total",
      value: `$${formatMoney(getMonthlyTotal(paymentOption)/100)}`,
    },
  ];

  return (
    <div className="rate-policy bg-white rounded shadow-sm mb-5">
    { breakdownData.map((item, index) =>
      <div key={`policy-breakdown-${index}`}className="rate-item-card__attribute d-flex justify-content-between">
        <div className='title d-flex align-items-center font-weight-bolder'>
          {item.label}
        </div>
        <div className='value text-capitalize'>{item.value}</div>
      </div>
    )}
   </div>
  )
};

export default PriceBreakdown;
