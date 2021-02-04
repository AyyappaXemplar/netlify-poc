import React from 'react';
import { Row, Col } from 'react-bootstrap';

function FormContainer({ bootstrapProperties, children, mbClass}) {
  return (
    <Row className="justify-content-center">
      <Col {...bootstrapProperties}>
        <div className={`shadow p-4 p-sm-5 ${mbClass ? mbClass : "mb-5"} bg-white rounded`}>
          {children}
        </div>
      </Col>
    </Row>
  );
}

export default FormContainer;
