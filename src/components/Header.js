import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';
import { withTranslation } from 'react-i18next';
import CustomProgressBar from './shared/CustomProgressBar';

class Header extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <Container className='mt-4 mb-5 header-container'>
        <Row className='align-items-center header-row'>
          <Col xs={6} lg={3}>
            <Logo className='logo'/>
          </Col>
          <Col xs={{order: 3, span: 12 }} lg={{ order: 0, span: 6 }}>
            <CustomProgressBar progress={this.props.state.progress}/>
          </Col>
          <Col xs={6} lg={3}>
            <div className='text-right'>
              <small className='mb-0'>{t('common:header.title')}</small>
              <p className='h5 mb-0'>(844) 358-5605</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation(['common'])(Header);
