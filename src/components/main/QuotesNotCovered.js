import React from 'react';
import FormContainer from '../shared/FormContainer';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import { withTranslation } from 'react-i18next';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import history from "../../history";
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';

class QuotesNotCovered extends React.Component {
  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.START)
  }

  handleSubmit(event) {
    history.push('/quotes/new')
  }

  useQuery() {
    return new URLSearchParams(this.props.location.search);
  }

  render() {
    const { t } = this.props;
    const location = this.useQuery().get('location')

    return (
      <>
        <FormContainer bootstrapProperties={{lg: 6, xl: 5}}>
          <h2 className="font-weight-bold">{t('title', { location })}</h2>
          <p className="mb-5 text-med-dark">{t('body', { location })}</p>
          <Form onSubmit={this.handleSubmit}>
            <div className='w-75 mx-auto'>
              <Button className='rounded-pill' size='lg' type="submit" block>
                {t('submit')}
              </Button>
            </div>
          </Form>
        </FormContainer>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} xl={4}>
              <p className="small text-med-dark text-center"><ShieldLogo className='mr-2'/>{t('common:badgeText')}</p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withTranslation(['quotesNotCovered', 'common'])(QuotesNotCovered);
