import React from 'react';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import { withTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

function BadgeText({ t, text }) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={6}>
          <p className="small text-med-dark text-center">
            <ShieldLogo className='mr-2'/>{t('badgeText')}
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default withTranslation(['common'])(BadgeText)
