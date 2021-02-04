import React, { useState, useEffect }  from "react";
import { useSelector, useDispatch }    from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";

import history       from "./../../history"
import { rateQuote } from '../../actions/rates'

import DriverDetailsReview from "./quoteReview/DriverDetailsReview";
import Drivers from "./quoteReview/Drivers";
import PolicyCoverages from "./quoteReview/PolicyCoverages";
import Vehicles from "./quoteReview/Vehicles"
import Discounts from "./quoteReview/Discounts"


export const QuoteReview = () => {
  const ratingQuote = useSelector(state => state.state.ratingQuote)
  const dispatch    = useDispatch();
  const [formSubmited, setFormSumbmitted] = useState(false)

  useEffect(() => {
    if (formSubmited && !ratingQuote) history.push("/bol/rate")
  }, [formSubmited, ratingQuote])

  const submitQuote = () => {
    setFormSumbmitted(true)
    dispatch(rateQuote(null, { type: 'final_quote' }))
  }

  return (
    <>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={6}>
            <h1>Everything Looks Good?</h1>
            <p>
              Review what you’ve added so far. If everything looks good, you can
              submit to get your policy.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} className={"d-flex justify-content-between"}>
            <p>
              <strong>Driver Details</strong>
            </p>

            <strong>Edit</strong>
          </Col>
        </Row>

        <DriverDetailsReview />
        <PolicyCoverages />
        <Vehicles />
        <Drivers />
        <Discounts/>

        <Row style={{display:"flex",justifyContent:"center", margin:'25px'}}>
          <Col xs={6}>
            <Button onClick={submitQuote} className="rounded-pill" size='lg' block>
              { ratingQuote ?  (
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : 'Get a Quote'
              }
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
