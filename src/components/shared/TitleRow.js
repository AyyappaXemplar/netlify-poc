import React from 'react';
import { Row, Col } from 'react-bootstrap';

function TitleRow({ title, subtitle, colClassNames }) {
  return (
    <Row className="justify-content-center mb-3">
      <Col lg={6} className={colClassNames}>
        <h1>{title}</h1>
        { subtitle && <p className="text-med-dark">{subtitle}</p> }
      </Col>
    </Row>
  );
}

export default TitleRow;
