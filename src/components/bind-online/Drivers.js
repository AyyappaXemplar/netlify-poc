import React from 'react'
import { useSelector } from "react-redux";
import DriverForm from "./driver/DriverForm"
export default function Drivers() {
const drivers = useSelector((redux) => {
    return redux.data.quote.drivers
    })
    
    return (
        <>
            
            {
                drivers.map((driver, index) => { 
                    return <DriverForm driver={driver} key={ index+1}/>
                })
            }
         
        </>
    )
}
