import React from "react";
import { useSelector } from "react-redux";
import DriverForm from "./driver/DriverForm";
export default function Drivers() {

  const driversRedux = useSelector((redux) => {
    const drivers = redux.data.quote.drivers.map((driver) => {
      const accident_violations = driver.accident_violations || []
      return { ...driver, accident_violations }

    })
    return drivers;
  });



  return (
    <>
      {driversRedux.map((driver, index) => {
        return (
          <DriverForm
            driver={driver}
            key={index + 1}
          />
        );
      })}
    </>
  );
}
