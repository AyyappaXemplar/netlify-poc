import React from 'react'
import { useSelector } from "react-redux";
// import DriverDetails from "./driver/DriverDetails"
// import LicenseInfo from "./driver/LicenseInfo"
// import Discounts from "./driver/Discounts"
import Driver from '../quote/Driver'
export default function Drivers() {
const drivers = useSelector((redux) => {
    return redux.data.quote.drivers
    })
    
    return (
        <>
            
            {
                drivers.map((driver) => { 
                    return <Driver driver={driver} />
                })
            }
            {/* <DriverDetails />
            <LicenseInfo />
            <Discounts /> */}
        </>
    )
}
