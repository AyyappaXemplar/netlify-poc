import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { withTranslation }     from 'react-i18next'
import ContactCard from '../shared/ContactCard'
import { Helmet } from 'react-helmet'
import mixpanel from "../../config/mixpanel"
import { useSelector } from "react-redux"

function ContactUs({ t }) {

  const rates = useSelector(state => state.data.rates)

  useEffect(() => {
    mixpanel.track("Pageview", { 
      "Page Title": "Contact Us Error Page", 
      "PTS Errors": rates.errors ? rates.errors : "No PTS Errors"
    })
  }, [rates.errors])

  return (
    <Container className="py-4 container-rate-overview__inner">
      <Helmet>
        <title>Contact us | InsureOnline.com</title>
      </Helmet>
      <Row>
        <Col lg={6} xl={5} className="mx-auto">
          <ContactCard t={t}/>
        </Col>
      </Row>
    </Container>
  )
}

export default withTranslation(['quotes'])(ContactUs);
