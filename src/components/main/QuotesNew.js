import React from 'react';
import FormContainer from '../shared/FormContainer';
import { withTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import history from "../../history";
import BadgeText from '../shared/BadgeText';

class QuotesNew extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: {
        zip_code: '',
        address: {
          state: 'IL',
          zip_code: ''
        }
      },
      enableSubmit: false }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { setAlert, data } = this.props
    const { verifyingZip } = this.props.state
    const { verifyingZip: prevVerifying } = prevProps.state
    const verifiedZip = !verifyingZip && prevVerifying

    if (!verifiedZip) return

    if (data.quote.id) {
      setAlert({variant: 'success', text:  `Congratulations we cover ${this.state.quote.zip_code}`})
      history.push('/quotes/edit')
    } else if (data.quote.error){
      history.push(`/quotes/not-covered?location=${this.state.quote.zip_code}`)
    }
  }

  handleChange(event) {
    const { quote } = this.state
    quote.zip_code = event.target.value
    quote.address.zip_code = event.target.value

    this.setState(quote, () =>{
      if (this.state.quote.zip_code.length >= 5) {
        this.setState({enableSubmit: true})
      } else {
        this.setState({enableSubmit: false})
      }
    });
  }

  handleSubmit(event) {
    const { createQuote } = this.props

    event.preventDefault()
    createQuote(this.state.quote)
  }

  render() {
    const { t } = this.props;

    return (
      <>
        <FormContainer bootstrapProperties={{lg: 6, xl: 5}}>
          <h2 className="mb-5 font-weight-bold">{t('new.title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-5">
              <Form.Label>{t('new.label')}</Form.Label>
              <Form.Control
                type="text"
                placeholder="12345"
                value={this.state.quote.zip_code}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className='w-75 mx-auto'>
              <Button className='rounded-pill' size='lg' type="submit" block disabled={!this.state.enableSubmit}>
                {t('new.submit')}
              </Button>
            </div>
          </Form>
        </FormContainer>
        <BadgeText/>
      </>
    );
  }
}

export default withTranslation(['quotes'])(QuotesNew);
