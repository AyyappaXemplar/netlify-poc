import React from 'react'
import DriverDetails from "../driver/DriverDetails"
// import LicenseInfo from "./driver/LicenseInfo"
// import Discounts from "./driver/Discounts"
export default function DriverForm({ driver }) {


    const button = document.querySelector(".toggleForm");
    const Form = document.querySelector("driverForm")

    const showForm = (e) => { 
        console.log(e.target.nextSibling)
    }
    return (
        <section >
            <button className="toggleForm" onClick={showForm}>+</button>
            <div className="driverForm">
                <DriverDetails driver={ driver }/>
               {/* 
            <LicenseInfo />
            <Discounts /> */}
            </div>
        </section>
            
    )
}
