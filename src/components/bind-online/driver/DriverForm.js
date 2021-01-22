import React, { useState } from "react";
import { useDispatch }     from "react-redux"
import { Container, Row, Col, Button } from "react-bootstrap";

import DriverDetails from "./DriverDetails";
import LicenseInfo   from "./LicenseInfo"
import Discounts     from "./Discounts"

import { updateDriver } from "../../../actions/drivers"

export default function DriverForm({ driver }) {
  const [driver_data, updateDrivers]      = useState(driver);
  const [displayDriver, setDisplayDriver] = useState(true)
  const dispatch = useDispatch();

  const updateParentState = (value, key) => {
    updateDrivers((prevState) => {
      let newState = { ...prevState }
      newState[key] = value;
      return newState;
    });
  };

  const dispatchDriver = () => {
    dispatch(updateDriver(driver_data.id ,driver_data))
  }

  return (
    <section>
      <Container>
        <Row>
          <Col md={{span: 10, offset: 1}}>
            <h3 onClick={() => setDisplayDriver(!displayDriver)}>
              { displayDriver ? '-' : '+'} {driver.first_name} {driver.last_name}
            </h3>
          </Col>
        </Row>
      </Container>
      <div className="driverForm hide" style={{display: displayDriver ? "block" : "none"}}>
        <DriverDetails driver={driver_data} updateParentState={updateParentState}/>
        <LicenseInfo driver={driver_data} updateParentState={updateParentState}/>
        <Discounts driver={driver_data} updateParentState={updateParentState} />
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button className="rounded-pill my-3" variant="primary" onClick={dispatchDriver}>Save Driver</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
