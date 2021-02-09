import React from "react";
import CustomCard from "../../shared/CustomCard";
import { Row, Col, Container, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import MaleIcon from '../../../images/adult-male.svg';
import FemaleIcon from '../../../images/adult-female.svg';
import AddButton from "../../shared/AddButton"
import Driver from '../driver/DriverReview'

const Drivers = ({ drivers }) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col className="col-6">
          <p>
            <strong>Drivers</strong>
          </p>
        </Col>
      </Row>

      <Row className='justify-content-center'>
        <Col xs={6}>
          { drivers.map((driver, index) => <Driver driver={driver} key={`driver=${driver.id}`}/> )}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col className="col-6">
          <AddButton text="Add Driver"/>
        </Col>
      </Row>

    </>
  );
};

export default Drivers;
