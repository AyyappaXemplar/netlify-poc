import React, { useState } from "react";
import { useSelector } from "react-redux";
import DriverForm from "./driver/DriverForm";
export default function Drivers() {
  const driversRedux = useSelector((redux) => {
    return redux.data.quote.drivers;
  });

  const [driversArray, updateDrivers] = useState(driversRedux);

  const updateParentState = (value, key, id) => {
    function findCar(car) {
      return (car.id = id);
    }
      updateDrivers((prevState) => {
      let newState = [...prevState]
      let carToBeUpdated = newState.find(findCar);
      carToBeUpdated[key] = value;
      return newState;
    });
  };

  return (
    <>
      {driversArray.map((driver, index) => {
        return (
          <DriverForm
            driver={driver}
            key={index + 1}
            updateParentState={updateParentState}
          />
        );
      })}
    </>
  );
}
