import React from "react";
import DriverDetails from "../driver/DriverDetails";
import LicenseInfo from "../driver/LicenseInfo"
import Discounts from "../driver/Discounts"
export default function DriverForm({ driver }) {
  const button = document.querySelector(".toggleForm");

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
        <DriverDetails driver={driver} />
        <LicenseInfo driver={driver} />
        <Discounts driver={driver}/>
      </div>
    </section>
  );
}
