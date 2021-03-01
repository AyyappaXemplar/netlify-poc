import React                   from "react";
import { useSelector }         from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link }                from 'react-router-dom'

import TitleRow            from '../shared/TitleRow'
import StartOverButton     from '../shared/StartOverButton';
import BadgeText           from "../shared/BadgeText";
import Drivers             from './quoteReview/Drivers';


const QuoteDrivers = () => {
  const quote = useSelector(state => state.data.quote)
  const vehicleId = quote.vehicles[0].idS
  const hasInValidations = useSelector(redux => redux.state.has_driver_invalidations);

  return (
    <Container>
      <TitleRow
        title={'Review all drivers on policy.'}
        subtitle={'Add up to six drivers to your policy.'}
      />

      <Row className="justify-content-center">
        <Col lg={6}>

          <Drivers drivers={quote.drivers}/>

          <p className="px-0 px-sm-3 mb-5 small text-med-dark text-center">
            Note: You must add everyone in your household that is 15 years or older, regardless if they are licensed/excluded.
            <Link to="/drivers/new" className="text-primary font-weight-bold"> Go back to add drivers. </Link>
          </p>


          <div className="w-100 w-sm-50 mx-auto my-4 my-sm-5">
            <Link className={`rounded-pill btn btn-primary btn-block btn-lg mb-3 ${ hasInValidations ? "disabled" : ""}`} to={`/bol/vehicles/${vehicleId}/edit`}>Save and Continue</Link>
            <StartOverButton/>
          </div>
        </Col>
      </Row>

      <BadgeText/>

    </Container>
  );
};

export default QuoteDrivers
