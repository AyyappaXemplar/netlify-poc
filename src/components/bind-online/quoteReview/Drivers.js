import React from "react";
import CustomCard from "../../shared/CustomCard";
import { Row, Col, Container, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import MaleIcon from '../../../images/adult-male.svg';
import FemaleIcon from '../../../images/adult-female.svg';
import AddButton from "../../shared/AddButton"

const Drivers = () => {
  const mockData = useSelector((redux) => redux.data.quote.drivers);
  console.log(mockData);
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-6">
            <p>
              <strong>Drivers</strong>
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-6">
            {mockData.map((driver, index) => {
              return (
                <CustomCard
                icon={driver.gender === "Male" ? <Image src={MaleIcon}/> : <Image src={FemaleIcon} />}
                  title={`${driver.first_name}${""}${driver.last_name}`}
                  body={`${driver.gender}, ${driver.age}, ${driver.marital_status}, ${driver.policy_holder_relationship}, ${driver.license_status}`}
                //   bodyCss=""
                //   iconBg=""
                  key={index + 1}
                />
              );
            })}
          </Col>
        </Row>
          </Container>
          <Container>
        <Row className="justify-content-center">
          <Col className="col-6">
            <AddButton text="Add Driver"/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Drivers;
