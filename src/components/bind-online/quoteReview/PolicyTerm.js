import React                   from "react";
import { Row, Col, Container } from "react-bootstrap";

import FormContainer from "../../shared/FormContainer";
import getDate from "../../../services/timestamps";

export default function DriverDetailsReview({quote}) {

  return (
    <FormContainer bootstrapProperties={{ md: 6 }}>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <p>
              <strong>Policy Term</strong>
            </p>
            <p>{quote.term.duration} months</p>
          </Col>
          <Col xs={12} md={6}>
            <p>
              <strong>Effective Dates</strong>
            </p>
            <p>{getDate(quote.term.effective, 'MM/DD/YYYY')} - {getDate(quote.term.expires, 'MM/DD/YYYY')}</p>
          </Col>
        </Row>
      </Container>
    </FormContainer>
  );
}
