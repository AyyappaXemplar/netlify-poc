import React from 'react';
import FormContainer from '../shared/FormContainer';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import { withTranslation } from 'react-i18next';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import history from "../../history";
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';

class DriversNew extends React.Component {
  constructor(props) {
    super(props)

    this.state = { enableSubmit: false, error: false }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.DRIVERS)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // TODO: maybe we need to move this somewhere else? (App or other component that check data status)
    // const { setAlert, data } = this.props

    // if (data.quote && !data.quote.error) {
    //   setAlert({variant: 'success', text:  `Congratulations we cover ${this.state.zip}`})
    //   history.push('/start/info')
    // } else if (data.quote && !prevProps.data.quote){
    //   // setAlert({variant: 'danger', text:  data.quote.error})
    //   this.setState({ error: { variant: 'danger', text:  data.quote.error } })
    // }
  }

  handleChange(event) {
    // this.setState({ event.target.value}, () =>{
    //   if (this.state.zip.length >= 5) {
    //     this.setState({enableSubmit: true})
    //   } else {
    //     this.setState({enableSubmit: false})
    //   }
    // });
  }

  handleSubmit(event) {
    // const { createQuote } = this.props

    // event.preventDefault()
    // createQuote(this.state.zip)
  }

  render() {
    const { t } = this.props;
    // const { error } = this.state;

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{md: 4}}>
          <h2 className="mb-5 font-weight-bold">{t('title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-5">
              <Form.Label>{t('label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder="12345"
                // value={this.state.zip}
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
          <Row>
            <Col md={4} className='text-center'>
              <p className="small text-med-dark"><ShieldLogo className='mr-2'/>{t('common:badgeText')}</p>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTranslation(['driversNew', 'common'])(DriversNew);
