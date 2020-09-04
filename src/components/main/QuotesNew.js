import React from 'react';
import FormContainer from '../shared/FormContainer';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import { withTranslation } from 'react-i18next';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import history from "../../history";
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';

class QuotesNew extends React.Component {
  constructor(props) {
    super(props)

    this.state = { zip: '', enableSubmit: false }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.START)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // TODO: maybe we need to move this somewhere else? (App or other component that check data status)
    const { setAlert, data } = this.props

    if (data.quote && !data.quote.error) {
      setAlert({variant: 'success', text:  `Congratulations we cover ${this.state.zip}`})
      history.push('/quotes/edit')
    } else if (data.quote && !prevProps.data.quote){
      history.push(`/quotes/not-covered?location=${this.state.zip}`)
    }
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
    const { createQuote } = this.props

    event.preventDefault()
    createQuote(this.state.zip)
  }

  render() {
    const { t } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <div>
          <h1>{error.text}</h1>
          <Button className="rounded-pill" size="lg" onClick={()=> this.setState({ error: false, zip: '' })}>Start Over</Button>
        </div>
      )
    }

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{lg: 6, xl: 5}}>
          <h2 className="mb-5 font-weight-bold">{t('title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-5">
              <Form.Label>{t('label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder="12345"
                value={this.state.zip}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className='w-75 mx-auto'>
              <Button className='rounded-pill' size='lg' type="submit" block disabled={!this.state.enableSubmit}>
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
      </React.Fragment>
    );
  }
}

export default withTranslation(['quotesNew', 'common'])(QuotesNew);