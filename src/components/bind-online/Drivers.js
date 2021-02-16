import React, { useState, useEffect } from "react";
import { useSelector }                from "react-redux";
import DriverForm                     from "./DriverForm";
import { Row, Col }        from "react-bootstrap";

export default function Drivers() {
  const drivers = useSelector(redux => redux.data.quote.drivers)

  const [driverDisplay, setDriverDisplay] = useState([])
  useEffect(() => { setDriverDisplay(Array(drivers.length).fill(false)) }, [drivers.length])

  const toggleDriver = index => {
    setDriverDisplay(prev => {
      let newAry = [...prev]
      newAry[index] = !newAry[index]
      return newAry
    })
  }

  if (!drivers) return
  return <>
    { drivers.map((driver, index) => (
      <section key={`driver-${driver.id}`}>
        <Row>
          <Col md={{span: 10, offset: 1}}>
            <h5 onClick={() => toggleDriver(index) }>
              {driverDisplay[index] ? '-' : '+'} {driver.first_name} {driver.last_name}
            </h5>
          </Col>
        </Row>
        <div className="driverForm hide" style={{display: driverDisplay[index] ? "block" : "none"}}>
          <DriverForm driver={driver}/>
        </div>
      </section>
    )) }
  </>
}
