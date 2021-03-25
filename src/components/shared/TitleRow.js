import React from 'react';
import { Row, Col } from 'react-bootstrap';

function TitleRow({ title, subtitle, colClassNames, leftAlign=false }) {
  return (
    <Row className={`${leftAlign ? "justify-content-start" : "justify-content-center"} mb-4 mb-sm-5`}>
      <Col lg={6} className={colClassNames}>
        <h1>{title}</h1>
        { subtitle && <p className="text-med-dark">{subtitle}</p> }
      </Col>
    </Row>
  );
}

export default TitleRow;
