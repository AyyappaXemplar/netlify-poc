import React from 'react';
import FormContainer from '../shared/FormContainer';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import { withTranslation } from 'react-i18next';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import history from "../../history";

class StartZip extends React.Component {
  constructor(props) {
    super(props)

    this.state = { zip: '', enableSubmit: false }
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
    const { verifyZip } = this.props

    event.preventDefault()
    verifyZip(this.state.zip)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { setAlert, data } = this.props

    if (data.quoteId && data.quoteId !== 'error') {
      this.addQuoteToLocalStorage(data.quoteId);
      setAlert({variant: 'success', text:  `Congratulations we cover ${this.state.zip}`})
      history.push('/start/info')
    } else if (data.quoteId && !prevProps.data.quoteId){
      setAlert({variant: 'danger', text:  `I'm sorry, we don't cover ${this.state.zip}`})
    }
  }

  addQuoteToLocalStorage(quoteId) {
    localStorage.setItem('quoteid', JSON.stringify(quoteId))
  }

  render() {
    const { t } = this.props;

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{md: {span: 4, offset: 4}}}>
          <h2 className="mb-5 font-weight-bold">{t('zip.title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-5">
              <Form.Label>{t('zip.label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder="12345"
                value={this.state.zip}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className='w-75 mx-auto'>
              <Button size='lg' variant="primary" type="submit" block disabled={!this.state.enableSubmit}>
                {t('zip.submit')}
              </Button>
            </div>
          </Form>
        </FormContainer>
        <Container>
          <Row>
            <Col md={{span: 4, offset: 4}} className='text-center'>
              <p className="small text-med-dark"><ShieldLogo className='mr-2'/>{t('zip.badgeText')}</p>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTranslation()(StartZip);
