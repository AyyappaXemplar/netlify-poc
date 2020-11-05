import React, { useState, useEffect } from 'react'
import { useLocation, Link }   from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { withTranslation }     from 'react-i18next'

import { ReactComponent as BackIcon } from '../../images/chevron-left.svg';

function ContactUs({ t, match }) {
  return (
    <Container className="py-4 container-rate-overview__inner">
      <Row>
        <Col lg={6}>
          <h1 className="h1-lg mb-2">We can’t get you a quote so please contact us</h1>
          <Link to="/quotes/review">Review your quote</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default withTranslation(['quotes'])(ContactUs);
