import React from "react";

const PriceBreakdown = ({ vehicle }) => {
  const breakdownData = [
    {
      label: "Policy Length",
      value: "6 months",
    },
    {
      label: "Down Payment",
      value: "$102.00",
    },
    {
      label: "Monthly Payment",
      value: "$102x5",
    },
    {
      label: "Total Fees",
      value: "$14.56",
    },
    {
      label: "Subtotal",
      value: "$612.00",
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
