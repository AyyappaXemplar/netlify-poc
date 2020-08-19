import React from 'react';
import Radio from '../forms/Radio';
import { Container, Row, Col, Form, Button  } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';

class StartZip extends React.Component {
  constructor(props) {
    super(props)
    this.state = { zip: '', enableSubmit: false, toInfo: false }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({zip: event.target.value}, () =>{
      if (this.state.zip.length >= 5) {
        this.setState({enableSubmit: true})
      } else {
        this.setState({enableSubmit: false})
      }
    });
  }

  handleSubmit(event) {
    if (this.state.zip === '60647') {
      this.setState({toInfo: true})
    } else {
      alert('error')
    }
  }

  render() {
    const { t } = this.props;

    if (this.state.toInfo) {
      return <Redirect to="/start/info" />
    }

    return (
      <Container className='mt-5'>
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <div class="shadow p-3 mb-5 bg-white rounded">
              <h1>{t('zip.title')}</h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{t('zip.label')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="12345"
                    value={this.state.zip}
                    onChange={this.handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!this.state.enableSubmit}>
                  {t('zip.submit')}
                </Button>
              </Form>
            </div>
            <small>{t('zip.badgeText')}</small>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation()(StartZip);
