import React                   from "react";
import { useSelector }         from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link }                from 'react-router-dom'

import TitleRow            from '../shared/TitleRow'
import StartOverButton     from '../shared/StartOverButton';
import BadgeText           from "../shared/BadgeText";
import Vehicles            from "./quoteReview/Vehicles";


const QuoteReview = () => {
  const vehicles = useSelector(state => state.data.quote.vehicles)

  return (
    <Container>
      <TitleRow
        title={'Review all vehicles on policy.'}
        subtitle={'Add up to six vehicles to your policy.'}
      />

      <Vehicles vehicles={vehicles}/>

      <Row className="justify-content-center">
        <Col lg={6}>
          <p className="px-0 px-sm-3 mb-5 small text-med-dark text-center">
            <Link to="/vehicles/new" className="text-primary font-weight-bold"> Go back to add vehicles. </Link>
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <div className="w-100 w-sm-50 mx-auto my-4 my-sm-5">
            <Link className="rounded-pill btn btn-primary btn-block btn-lg mb-3" to={'/bol/coverages/edit'}>Save and Continue</Link>
            <StartOverButton/>
          </div>
        </Col>
      </Row>

      <BadgeText/>

    </Container>
  );
};

export default QuoteReview
