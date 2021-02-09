import React        from "react";
import { Row, Col } from "react-bootstrap";

import history from '../../../history'

import AddButton from "../../shared/AddButton"
import Driver    from '../driver/DriverReview'

const Drivers = ({ drivers }) => {
  const goToDriversNew = () => history.push('/drivers/new')

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
          <AddButton text="Add Driver" onClick={goToDriversNew}/>
        </Col>
      </Row>

    </>
  );
};

export default Drivers;
