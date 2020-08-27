import React from 'react';
import FormContainer from '../shared/FormContainer';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages'
import Radio from '../forms/Radio'
import history from '../../history';


class StartInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currently_insured: undefined, homeowner: undefined }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.START)
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUpdate = prevProps.state.updatingQuoteInfo
    const { updatingQuoteInfo } = this.props.state

    if (!prevUpdate && updatingQuoteInfo) {
      history.push('/vehicles/add')
    }
  }

  handleSubmit(event) {
    const { updateQuote } = this.props

    event.preventDefault()
    updateQuote(this.state)
  }

  render() {
    const { t } = this.props
    const changeHomeOwnership = homeowner => this.setState({ homeowner })
    const changeCarInsurance  = currently_insured  => this.setState({ currently_insured })
    const enabled = Object.values(this.state).every(element => element !== undefined)

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{md: {span: 6, offset: 3}}}>
          <h2 className="mb-5 font-weight-bold ">{t('title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label>{t('info:fields.home.label')}</Form.Label>
            <div className='mb-3 d-flex'>
              { t('info:fields.home.options').map((item, index) =>

                <Radio type={'radio'} id={`info-home-${item.value}`}
                       label={item.label}
                       value={item.value}
                       key={index}
                       selected={this.state.homeowner === item.value}
                       onChange={() => changeHomeOwnership(item.value)} inline={true}/>

              )}
            </div>
            <Form.Label>{t('info:fields.car.label')}</Form.Label>
            <div className='mb-5 d-flex'>
              { t('info:fields.car.options').map((item, index) =>
                <Radio
                  type={'radio'} id={`info-car-${item.value}`}
                  label={item.label}
                  value={item.value}
                  key={index}
                  selected={this.state.currently_insured === item.value}
                  onChange={() => changeCarInsurance(item.value)} inline={true}/>
              )}
            </div>
            <div className='w-75 mx-auto'>
              <Button size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('info:submit')}
              </Button>
            </div>
          </Form>
        </FormContainer>
        <Container>
          <Row>
            <Col md={{span:6, offset: 3}}>
              <p className="small text-med-dark">
                <ShieldLogo className='mr-2'/>{t('common:badgeText')}
              </p>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTranslation(['info', 'common'])(StartInfo);
