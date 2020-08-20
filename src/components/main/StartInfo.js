import React from 'react';
import FormContainer from '../shared/FormContainer';
import { Container, Row, Col } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import { progressBarStatus } from '../../constants/progress-bar-percentages'

class StartInfo extends React.Component {
  componentDidMount() {
    const { setProgress } = this.props
    setProgress(progressBarStatus.DRIVERS)
  }

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
              <p className="small text-med-dark"><ShieldLogo className='mr-2'/>{t('zip.badgeText')}</p>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTranslation()(StartInfo);
