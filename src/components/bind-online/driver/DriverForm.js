import React, { useState } from "react";
import DriverDetails from "../driver/DriverDetails";
import LicenseInfo from "../driver/LicenseInfo"
import Discounts from "../driver/Discounts"
export default function DriverForm({ driver }) {
  const button = document.querySelector(".toggleForm");
  const [driver_data, updateDrivers] = useState(driver);

  const updateParentState = (value, key) => {
    updateDrivers((prevState) => {
      let newState = { ...prevState }
      newState[key] = value;
      return newState;
    });
  };
  const showForm = (e) => {
    const Form = e.target.nextSibling;
    Form.classList.toggle("hide");
  };
  return (
    <section>
      <button className="toggleForm" onClick={showForm}>
        +
      </button>
      <div className="driverForm hide">
        <DriverDetails driver={driver_data} updateParentState={updateParentState}/>
        <LicenseInfo driver={driver_data} updateParentState={updateParentState}/>
        <Discounts driver={driver_data} updateParentState={updateParentState}/>
      </div>
    </section>
  );
}
