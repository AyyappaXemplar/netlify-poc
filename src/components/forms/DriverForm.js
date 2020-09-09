import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import FormContainer from '../shared/FormContainer';
import Radio from '../forms/Radio';

class DriverForm extends React.Component {
  TEXT_INPUT_FIELDS = ['firstName', 'lastName', 'birthday']
  RADIO_BUTTON_FIELDS = ['gender', 'maritalStatus', 'licenseStatus']
  PRESENT_FIELDS = ['first_name', 'last_name', 'birthday', 'gender', 'marital_status', 'license_status']

  constructor(props) {
    super(props)
    this.state = { driver: this.props.driver }
  }

  updateVehicleState(item, event) {
    event.preventDefault()
    const { driver } = this.state

    driver[item.name] = event.target.value || item.value
    this.setState({ driver })
  }

  cancelSubmit(event) {
    event.preventDefault()
    this.props.history.goBack();
  }

  enableSubmit() {
    const { driver } = this.state

    return this.PRESENT_FIELDS
      .map(field => driver[field])
      .every(property => property)
  }

  textInputs() {
    return this.TEXT_INPUT_FIELDS.map(property => {
      let item = this.props.t(`form.attributes.${property}`)

      return (
        <Col className='mb-3' xs={12} sm={6} key={property}>
          <Form.Label>{item.label}</Form.Label>
          <Form.Control
            className="font-weight-light"
            type="text"
            placeholder={item.placeholder}
            value={this.state.driver[item.name]}
            onChange={this.updateVehicleState.bind(this, item)}
          />
        </Col>
      )
    })
  }

  radioButtoms() {
    return this.RADIO_BUTTON_FIELDS.map(property => {
      let item = this.props.t(`form.attributes.${property}`)
      let changeDriver = (option) => {
        let { driver } = this.state
        driver[item.name] = option.value
        this.setState({ driver })
      }

      return (
        <React.Fragment key={property}>
          <Form.Label>{item.label}</Form.Label>
          <Row className="mb-5">
            { item.options.map( option =>
              <Col xs={12} sm={6} key={option.value}>
                <Radio
                  type={'radio'} id={`driver-${option.value}`}
                  label={option.label}
                  value={option.value}
                  selected={this.state.driver[item.name] === option.value}
                  onChange={changeDriver.bind(this, option)}
                />
              </Col>
            )}
          </Row>
        </React.Fragment>
      )
    })
  }

  discounts() {
    return this.props.t('form.attributes.discounts.attributes').map(item => {
      let changeDriver = () => {
        const { driver } = this.state
        driver[item.name] = !driver[item.name]
        this.setState({ driver })
      }

      return(
        <Radio
          key={item.name}
          type='checkbox'
          label={item.label}
          value={this.state.driver[item.name]}
          selected={this.state.driver[item.name]}
          onChange={changeDriver.bind(this)}
        />
      )
    })
  }

  render() {
    const { t, title, handleSubmit } = this.props
    const enabled = this.enableSubmit()
    const cancelSubmit = this.cancelSubmit.bind(this)
    const onSubmit = (event) => handleSubmit(event, this.state.driver)

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{lg: 6}}>
          <h2 className="mb-5 font-weight-bold ">{title}</h2>
          <Form onSubmit={onSubmit}>

            <Row className="mb-5">
              { this.textInputs() }
            </Row>

            { this.radioButtoms() }

            <Form.Label>{t('form.attributes.discounts.label')}</Form.Label>
            <div className="mb-5">
              { this.discounts() }
            </div>


            <div className='w-75 mx-auto d-flex flex-column align-items-center'>
              <Button className='rounded-pill mb-3' size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('form.submit')}
              </Button>
              <Button onClick={cancelSubmit} variant='link' className='text-med-dark'><u>{t('form.cancel')}</u></Button>
            </div>
          </Form>
        </FormContainer>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <p className="small text-med-dark text-center">
                <ShieldLogo className='mr-2'/>{t('common:badgeText')}
              </p>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTranslation(['drivers', 'common'])(DriverForm)
