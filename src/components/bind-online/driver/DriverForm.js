import React, { useState, useEffect }  from "react";
import { useDispatch }                 from "react-redux"
import { Container, Row, Col, Button } from "react-bootstrap";

import DriverDetails from "./DriverDetails";
import LicenseInfo   from "./LicenseInfo"
import Discounts     from "./Discounts"

import { updateDriver } from "../../../actions/drivers"

export default function DriverForm({ driver }) {
  const [driverData, updateDriverData]      = useState(driver);
  const [displayDriver, setDisplayDriver] = useState(true)
  const dispatch = useDispatch();

  // TODO: we might not need to keep the state in sync with redux when we move to the URL workflow
  useEffect(() => { updateDriverData(driver) }, [driver])

  const updateParentState = (value, key) => {
    updateDriverData((prevState) => {
      let newState = { ...prevState }
      newState[key] = value;
      return newState;
    });
  };

  const dispatchDriver = () => {
    dispatch(updateDriver(driverData.id ,driverData))
  }

  const addViolation = (violation) => {
    updateDriverData((prevState) => {
      let newViolations = [...prevState.accident_violations]
      newViolations.push(violation)
      return { ...prevState, accident_violations: newViolations }
    });
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
        <DriverDetails driver={driverData} updateParentState={updateParentState}/>
        <LicenseInfo driver={driverData} updateParentState={updateParentState} addViolation={addViolation}/>
        <Discounts driver={driverData} updateParentState={updateParentState} />
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
