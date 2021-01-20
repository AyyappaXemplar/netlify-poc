import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import DriverDetails from "../driver/DriverDetails";
import LicenseInfo from "../driver/LicenseInfo"
import Discounts from "../driver/Discounts"
import { Container, Row, Col, Button } from "react-bootstrap";
import { updateDriver } from "../../../actions/drivers"

export default function DriverForm({ driver }) {
  const button = document.querySelector(".toggleForm");
  const [driver_data, updateDrivers] = useState(driver);
  const dispatch = useDispatch();

  const updateParentState = (value, key) => {
    updateDrivers((prevState) => {
      let newState = { ...prevState }
      newState[key] = value;
      return newState;
    });
  };

  const dispatchDriver = () => { 
    console.log(driver_data);
    dispatch(updateDriver(driver_data.id ,driver_data))
  }


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
        <Discounts driver={driver_data} updateParentState={updateParentState} />
        <Container>
          <Row>
            <Col>
              <Button className="submit" onClick={dispatchDriver}>Dispatch</Button>
              </Col>
            </Row>
        </Container>
      </div>
    </section>
  );
}
