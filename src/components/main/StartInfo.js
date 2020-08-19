import React from 'react';
import Radio from '../forms/Radio';
import { Container, Row, Col, Form, Button  } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

class StartInfo extends React.Component {
  render() {
    const { t } = this.props

    return (
      <Container className='mt-5'>
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <div class="shadow p-3 mb-5 bg-white rounded">
              <h1>{t('info.title')}</h1>
            </div>
            <small>{t('zip.badgeText')}</small>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation()(StartInfo);
