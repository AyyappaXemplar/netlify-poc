import React from "react";

const PriceBreakdown = ({ vehicle }) => {
  const breakdownData = [
    {
      label: "policy Length",
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
    <>
      {breakdownData.map((item, index) => {
          return (
            <div className="px-4 bg-white shadow-sm">
              <section className=" py-4 pb-2">
                <div
                  key={index + 1}
                  className="rate-item-card__attribute py-0 d-flex"
                >
                  <div className="w-50 title bold">
                    <strong>{item.label}</strong>
                  </div>
                  <div className="w-50">{item.value}</div>
                </div>
              </section>
              {index >= breakdownData.length - 1 ? "" : <hr className="m-0" />}
            </div>
          );
      })}
    </>
  );
};

export default PriceBreakdown;
