import React from 'react';
import FormContainer from '../shared/FormContainer';
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
    event.preventDefault()

    const { setAlert } = this.props

    if (this.state.zip === '60647') {
      setAlert({variant: 'success', text:  `Congratulations we cover ${this.state.zip}`})
      history.push('/start/info')
    } else {
      setAlert({variant: 'danger', text:  `I'm sorry, we don't cover ${this.state.zip}`})
    }
  }

  render() {
    const { t } = this.props;

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{md: {span: 6, offset: 3}}}>
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

            <Button size='lg' variant="primary" type="submit" block disabled={!this.state.enableSubmit}>
              {t('zip.submit')}
            </Button>
          </Form>
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

export default withTranslation()(StartZip);
