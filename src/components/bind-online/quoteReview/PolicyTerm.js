import React from "react";
import FormContainer from "../../shared/FormContainer";
import { Row, Col, Container } from "react-bootstrap";
export default function DriverDetailsReview() {
  return (
    <FormContainer bootstrapProperties={{ md: 6 }}>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <p>
              <strong>Policy Term</strong>
            </p>
            <p>6 month</p>
          </Col>
          <Col xs={12} md={6}>
            <p>
              <strong>Effective Dates</strong>
            </p>
            <p>01/12/2020 - 07/12/2020</p>
          </Col>
        </Row>
      </Container>
    </FormContainer>
  );
}
