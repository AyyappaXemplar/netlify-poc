import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DriverDetailsReview from "./quoteReview/DriverDetailsReview";
export const QuoteReview = () => {
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
      </Container>
    </>
  );
};
