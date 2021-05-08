import React                   from "react";
import { useSelector }         from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link }                from 'react-router-dom'

import TitleRow        from '../shared/TitleRow'
import StartOverButton from '../shared/StartOverButton';
import BadgeText       from "../shared/BadgeText";
import VehicleReview   from "./vehicle/VehicleReview";
import validateVehicle from '../../validators/bind-online/VehicleForm'
import { Helmet } from 'react-helmet'

const QuoteReview = () => {
  const vehicles = useSelector(state => state.data.quote.vehicles.map(vehicle => {
    return {...vehicle, valid: !validateVehicle(vehicle)}
  }))

  const disabledClassname = vehicles.some(driver=>!driver.valid) ? 'disabled' : ""

  return (
    <Container>
      <Helmet>
        <title>Vehicles review | InsureOnline.com</title>
      </Helmet>
      <TitleRow
        title={'Review all vehicles on policy.'}
        subtitle={'Add up to six vehicles to your policy.'}
      />

      <Row className="justify-content-center">
        <Col lg={6}>


          <label>Vehicles</label>

          <div className='mb-5'>
            {vehicles.map(vehicle =>
              <VehicleReview key={`vehicle-${vehicle.id}`} vehicle={vehicle}/>
            )}
          </div>

          <p className="px-0 px-sm-3 mb-5 small text-med-dark text-center">
          <span className="d-block">If you'd like to add additional vehicles, you'll need to go back to add and re-rate your original quote.</span>
            <span className="d-block">Add all vehicles in your household.</span>
            <Link to="/vehicles/new" className="text-primary font-weight-bold"> Go back to add vehicles. </Link>
          </p>

          <div className="w-100 w-sm-50 mx-auto m-4 my-sm-5">
            <Link className={`rounded-pill btn btn-primary btn-block btn-lg mb-3 ${disabledClassname}`}
              to={'/bol/coverages'}>Save and Continue</Link>
            <StartOverButton/>
          </div>
        </Col>
      </Row>

      <BadgeText/>

    </Container>
  );
};

export default QuoteReview
