import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { withTranslation }     from 'react-i18next'

import ContactCard from '../shared/ContactCard'


function ContactUs({ t }) {
  return (
    <Container className="py-4 container-rate-overview__inner">
      <Row>
        <Col lg={6} xl={5} className="mx-auto">
          <ContactCard t={t}/>
        </Col>
      </Row>
    </Container>
  )
}

export default withTranslation(['quotes'])(ContactUs);
