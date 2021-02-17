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
      value: `$${formatMoney(getMonthlyTotal(paymentOption))}`,
    },
  ];
  return (
    <div className="px-4 bg-white rounded shadow-sm mb-5">
    { breakdownData.map((item, index) =>
      <section className="quote-item-card quote-item-card__policy-terms" key={index + 1}>
        <div className="py-0 d-flex">
          <div className="w-50 title">{item.label}</div>
          <div className="w-50">{item.value}</div>
        </div>
      </section>
    )}
    </div>
  )
};

export default PriceBreakdown;
