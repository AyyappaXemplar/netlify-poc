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
    <div className="px-4 bg-white rounded shadow-sm">
    { breakdownData.map((item, index) =>
      <>
        <section className="py-4" key={index + 1}>
          <div className="rate-item-card__attribute py-0 d-flex">
            <div className="w-50 title bold">
              <strong>{item.label}</strong>
            </div>
            <div className="w-50">{item.value}</div>
          </div>
        </section>

        {index >= breakdownData.length - 1 ? "" : <hr className="m-0" />}
      </>
    )}
    </div>
  )
};

export default PriceBreakdown;
