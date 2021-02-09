import React from "react";
import { Col, Row } from "react-bootstrap";

import AddButton from "../../shared/AddButton";
import Vehicle from '../../rate/Vehicle'

const Vehicles = ({ vehicles }) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col className="col-6">
          <p>
            <strong>Vehicles and Coverages</strong>
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-2">
        <Col md={6} >
          {vehicles.map((vehicle, i) => (
            <Vehicle
              key={`vehicle-${vehicle.id}`}
              vehicle={vehicle}
              displayCoverageSelector={false}/>
          ))}
        </Col>
      </Row>

      <Row className={"justify-content-center"}>
        <Col className={"col-6"}>
          <AddButton
            onClick={() => false}
            disabled={false}
            text={"Add Car"}
          />
        </Col>
      </Row>
    </>
  );
};

export default Vehicles;
