import React, { useState, useEffect } from "react";
import { useSelector }                from "react-redux";
import DriverForm                     from "./driver/DriverForm";
import { Container, Row, Col }        from "react-bootstrap";

export default function Drivers() {
  const drivers = useSelector((redux) => {
    return redux.data.quote.drivers.map((driver) => {
      const violations = driver.violations || []
      return { ...driver, violations }

    })
  });

  const [driverDisplay, setDriverDisplay] = useState([])
  useEffect(() => { setDriverDisplay(Array(drivers.length).fill(false)) }, [drivers.length])

  const toggleDriver = index => {
    setDriverDisplay(prev => {
      let newAry = [...prev]
      newAry[index] = !newAry[index]
      return newAry
    })
  }

  if (!drivers.length) {
    return false
  } else {
    return (
      <>
        {drivers.map((driver, index) => {
          return (
            <section key={`driver-${driver.id}`}>
              <Container>
                <Row>
                  <Col md={{span: 10, offset: 1}}>
                    <h3 onClick={() => toggleDriver(index) }>
                      { driverDisplay[index] ? '-' : '+'} {driver.first_name} {driver.last_name}
                      <div className="driverForm hide" style={{display: driverDisplay[index] ? "block" : "none"}}>
                        <DriverForm driver={driver}/>
                      </div>
                    </h3>
                  </Col>
                </Row>
              </Container>>
            </section>
          );
        })}
      </>
    );
  }
}
