import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap'

function SpinnerScreen({ title, t }) {
  const [displayedTitle, setDisplayedTitle] = useState('Loading')
  useEffect(() => {
    if (title) {
      setDisplayedTitle(title)
    }
  }, [title])

  return (
    <Container>
      <Row>
        <Col lg={5} className="mx-auto">
          <div className="text-center">
            <h1 className="mb-5">{displayedTitle}</h1>

            <div className="spinner-border"role="status">
              <span className="sr-only">{displayedTitle}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SpinnerScreen;
