import React                   from "react";
import { Row, Col, Container } from "react-bootstrap";

import FormContainer from "../../shared/FormContainer";
import getDate from "../../../services/timestamps";

export default function DriverDetailsReview({quote}) {

  return (
    <Row>
      <Col lg={{span: 6, offset: 3}}>
        <Row className='bg-white rounded shadow-sm mb-5 p-4'>
          <Col lg={6}>
            <p>
              <strong>Policy Term</strong>
            </p>
            <p className="mb-0">{quote.term.duration} months</p>
          </Col>
          <Col xs={12} md={6}>
            <p>
              <strong>Effective Dates</strong>
            </p>
            <p className="mb-0">{getDate(quote.term.effective, 'MM/DD/YYYY')} - {getDate(quote.term.expires, 'MM/DD/YYYY')}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
