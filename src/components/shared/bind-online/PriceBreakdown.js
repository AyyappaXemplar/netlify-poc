import React from "react";
import { monthlyPaymentOption, formatMoney,
                      getMonthlyTotal } from '../../../services/payment-options';
import { getAmount, getDeposit }        from '../../../services/rate-payment-details';
import { withTranslation } from 'react-i18next'

const PriceBreakdown = ({ rate, t }) => {
  const paymentOption = monthlyPaymentOption(rate)

  const breakdownData = [
    {
      label: t("priceBreakdown.policyLength"),
      value: `${rate.term.duration} ${t("priceBreakdown.months")}`,
    },
    {
      label: t("priceBreakdown.downPayment"),
      value: `$${formatMoney(getDeposit(paymentOption))}`,
    },
    {
      label: t("priceBreakdown.monthlyPayment"),
      value: `$${getAmount(paymentOption)} x ${paymentOption.number_of_payments}`,
    },
    {
      label: t("priceBreakdown.total"),
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

export default withTranslation(["rates"])(PriceBreakdown);
