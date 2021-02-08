import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";

import IconListItem from "../../shared/bind-online/IconListItem";
import CarIcon from "../../../images/placeholder_nissan.png";
import AddButton from "../../shared/AddButton";
import Vehicle from '../../rate/Vehicle'

const Vehicles = ({ quote }) => {
  const caricon = <Image src={CarIcon} />;
  const vehicles = quote.vehicles;

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
          {vehicles.map((vehicle, i) => <Vehicle vehicle={vehicle} displayCoverageSelector={false}/>)}
        </Col>
      </Row>

      <Row className={"justify-content-center"}>
        <Col className={"col-6"}>
          <AddButton
            onClick={() => {
              return false;
            }}
            disabled={false}
            text={"Add Car"}
          />
        </Col>
      </Row>
    </>
  );
};

export default Vehicles;
