import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';
import CustomProgressBar from './shared/CustomProgressBar';

class Header extends React.Component {
  render() {
    return (
      <Container className='mt-4 mb-5' id='header'>
        <Row>
          <Col xs={6} lg={3}>
            <Logo className='logo'/>
          </Col>
          <Col xs={{order: 1, span: 12 }} lg={{ order: 0, span: 6 }} className='d-flex flex-column align-items-stretch justify-content-end mb-2 mt-5 mt-lg-0'>
            <CustomProgressBar progress={this.props.state.progress}/>
          </Col>
          <Col xs={6} lg={3}>
            <div className='text-right'>
              <small className='mb-0'>Want to speak with an agent?</small>
              <p className='h5 mb-0'>(844) 358-5605</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
