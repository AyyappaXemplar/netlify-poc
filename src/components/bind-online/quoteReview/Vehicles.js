import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import VehicleCoverages from "../../rate/VehicleCoverages";
import ratesMockData from "../../../server/rate2.json";
import IconListItem from "../../shared/bind-online/IconListItem";
import CarIcon from "../../../images/placeholder_nissan.png";
import AddButton from "../../shared/AddButton";

const Vehicles = () => {
  const caricon = <Image src={CarIcon} />;

  const getVehicles = (nestedArray) => {
    for (let index = 0; index < nestedArray.length; index++) {
      const innerArray = nestedArray[index];
      return innerArray;
    }
  };

  const vehiclesArray = getVehicles(ratesMockData);

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-6">
            <p>
              <strong>Vehicles and Coverages</strong>
            </p>
          </Col>
        </Row>
      </Container>
      <Container
        className={"bg-white shadow rounded col-xs-12 col-md-6 mb-2 vehicles"}
        style={{ padding: "10px 10px 20px" }}
      >
        <Row>
          <Col>
            <IconListItem
              index={1}
              header={"2007 BMW 328 XI"}
              check={caricon}
              copy={
                "Commute to work and school, 1111222345678, 62,500 miles,10,000/yr, CapitalOne Auto (Lien)"
              }
              flexRow={false}
              shadow={false}
            />
          </Col>
        </Row>
        <Row className={"justify-content-center"}>
          <Col className="">
            {vehiclesArray.vehicles.map((carObj, i) => {
              return <VehicleCoverages vehicle={carObj} key={i + 1} />;
            })}
          </Col>
        </Row>
      </Container>
      <Container>
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
      </Container>
    </>
  );
};

export default Vehicles;
