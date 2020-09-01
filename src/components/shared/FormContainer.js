import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FormContainer({ bootstrapProperties, children}) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col {...bootstrapProperties}>
          <div className="shadow p-5 mb-5 bg-white rounded">
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
