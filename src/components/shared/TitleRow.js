import React from 'react';
import { Row, Col } from 'react-bootstrap';

function TitleRow({ title, subtitle }) {
  return (
    <Row className="justify-content-center mb-5">
      <Col lg={6}>
        <h1>{title}</h1>
        { subtitle && <p className="text-med-dark">{subtitle}</p> }
      </Col>
    </Row>
  );
}

export default TitleRow;
