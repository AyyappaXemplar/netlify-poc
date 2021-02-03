import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import IconListItem from "../../shared/bind-online/IconListItem";
import InfoIcon from "../../../images/placeholder_nissan.png";
import VehicleCoverages from "../../rate/VehicleCoverages";
import { useSelector } from "react-redux";
import vehiclesData from "../../../server/rate2.json";
const Vehicles = () => {
    
  const getVehicles = (nestedArray) => {
    for (let index = 0; index < nestedArray.length; index++) {
      const innerArray = nestedArray[index];
      return innerArray;
    }
  };

  const nestedArray = getVehicles(vehiclesData);

  return (
    <Container
      className={"bg-white shadow rounded col-xs-12 col-md-6 mb-5 vehicles"}
      style={{ padding: "10px 10px 20px" }}
    >
      <Row className={"justify-content-center"}>
        <Col className="">
          {nestedArray.vehicles.map((carObj, i) => {
            return <VehicleCoverages vehicle={carObj} key={i + 1} />;
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Vehicles;
