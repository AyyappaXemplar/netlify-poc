import React from 'react'
import { Link }   from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { withTranslation }     from 'react-i18next'
import { ReactComponent as PhoneIcon } from '../../images/phone-icon.svg';
import { ReactComponent as EmailIcon } from '../../images/email-icon.svg';
import PhoneNumberLink from '../shared/PhoneNumberLink';

function ContactUs({ t, match }) {
  return (
    <Container className="py-4 container-rate-overview__inner">
      <Row>
        <Col lg={6} xl={5} className="mx-auto">
          <div className="shadow p-5 mb-5 bg-white rounded">
            <h2 className="h1-lg mb-2">
              {t('contact.title')}
            </h2>
            <p>{t('contact.description')}</p>

            <div className="my-4">
              <h5 className="mb-3">{t('contact.subtitle')}</h5>

              <div className="text-dark mb-3">
                <PhoneIcon className="mr-3" />
                <PhoneNumberLink number={t('common:header.phoneNumber')} classes="text-dark" />
              </div>

              <div className="text-dark">
                <EmailIcon className="mr-3" />
                <a href={"mailto:" + t('common:header.emailAddress')} className="text-dark">
                  {t('common:header.emailAddress')}
                </a>
              </div>
            </div>

            <p>Everything you've added has been saved, you can <Link to="/quotes/review">review your quote</Link> at any time.</p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default withTranslation(['quotes'])(ContactUs);
