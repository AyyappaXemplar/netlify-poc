import React from 'react';
import Radio from '../forms/Radio';
import FormContainer from '../shared/FormContainer';
import { Container, Row, Col } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

class StartInfo extends React.Component {
  render() {
    const { t } = this.props

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{md: {span: 6, offset: 3}}}>
          <h2 className="mb-5 font-weight-bold ">{t('info.title')}</h2>
        </FormContainer>
        <Container>
          <Row>
            <Col md={{span:6, offset: 3}}>
              <small>{t('zip.badgeText')}</small>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTranslation()(StartInfo);
