import React from "react";
import { useSelector } from "react-redux";
import DriverForm from "./driver/DriverForm";
export default function Drivers() {

  const driversRedux = useSelector((redux) => {
    return redux.data.quote.drivers;
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
