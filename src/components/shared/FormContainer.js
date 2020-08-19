import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class FormContainer extends React.Component {
  render() {
    return (
       <Container className='mt-5'>
        <Row>
          <Col {...this.props.bootstrapProperties}>
            <div className="shadow p-5 mb-5 bg-white rounded">
              {this.props.children}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FormContainer;
