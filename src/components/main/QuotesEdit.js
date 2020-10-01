import React from 'react';
import FormContainer from '../shared/FormContainer';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { withTranslation, Trans } from 'react-i18next';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages'
import BadgeText from '../shared/BadgeText';
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

    if (prevUpdate && !updatingQuoteInfo) {
      history.push('/vehicles/new')
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
      <>
        <FormContainer bootstrapProperties={{lg: 6}}>
          <h2 className="mb-5 font-weight-bold ">{t('edit.title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label>{t('edit.fields.home.label')}</Form.Label>
            <div className='mb-3 d-flex'>
              { t('edit.fields.home.options').map((item, index) =>

                <Radio type={'radio'} id={`info-home-${item.value}`}
                       label={item.label}
                       value={item.value}
                       key={index}
                       selected={this.state.homeowner === item.value}
                       onChange={() => changeHomeOwnership(item.value)} inline={true}/>

              )}
            </div>
            <Form.Label>{t('edit.fields.car.label')}</Form.Label>
            <div className='mb-5 d-flex'>
              { t('edit.fields.car.options').map((item, index) =>
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
              <Button className="rounded-pill" size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('edit.submit')}
              </Button>
            </div>
          </Form>
        </FormContainer>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <p className="px-3 mb-5 small text-med-dark text-center">
                <Trans i18nKey="quotesEdit:footerText">

                  By clicking "Save & continue," you consent to Insure Online saving the information
                  you entered and sharing it with insurance carriers so you can get the most up-to-date quotes,
                  no matter what device you're using. Additionally, carriers may use this to obtain information
                  about your credit history. You also agree to Insure Online’s
                  <a href="/terms" className="text-muted font-weight-bold">Privacy Policy</a>
                  and
                  <a href="/privacy" className="text-muted font-weight-bold">Terms of Service.</a>
                </Trans>
              </p>
            </Col>
          </Row>
        </Container>
        <BadgeText/>
      </>
    );
  }
}

export default withTranslation(['quotes'])(StartInfo);


