import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';
import { withTranslation } from 'react-i18next';
import progressBarRoutes from '../progress-bar-routes'
import PhoneNumberLink from './shared/PhoneNumberLink'

class Header extends React.Component {
  progressBar() {
    return progressBarRoutes.map((route, index) => (
      <Route path={route.path} key={index} render={route.render} />
    ))
  }

  render() {
    const { t } = this.props;
    const progressBar = this.progressBar()

    return (
      <Container className='header-container'>
        <Row className='align-items-center header-row'>
          <Col xs={12} sm={6} lg={3} className="text-center text-sm-left my-3 my-sm-0">
            <Logo className='logo'/>
          </Col>
          <Col xs={{order: 3, span: 12 }} lg={{ order: 0, span: 6 }}>
            { progressBar }
          </Col>
          <Col xs={12} sm={6} lg={3} className="header-contact text-center text-sm-right">
            <small className='mb-0'>{t('common:header.title')}</small>

            <p class="h5 mb-0">
              <PhoneNumberLink number={t('common:header.phoneNumber')} classes="text-dark" />
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation(['common'])(Header);
