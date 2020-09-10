import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import FormContainer from '../shared/FormContainer';
import BadgeText from '../shared/BadgeText';
import Radio from '../forms/Radio';
import * as Driver from '../../constants/driver'

class DriverForm extends React.Component {
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

    return Driver.PRESENT_FIELDS
      .map(field => driver[field])
      .every(property => property)
  }

  textInputs() {
    return Driver.TEXT_INPUT_FIELDS.map(property => {
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
          { item.smallText && <small className="form-text text-muted">{item.smallText}</small> }
        </Col>
      )
    })
  }

  ageInput() {
    const { t } = this.props
    const updateBirthday = (event) => {
      const { driver } = this.state
      driver.birthday = event.target.value
      this.setState({ driver })
    }

    return (
      <Col className='mb-3' xs={12} sm={6}>
        <Form.Label>{t('form.attributes.birthday.label')}</Form.Label>
        <Form.Control
          className="font-weight-light"
          type="number"
          min={Driver.MIN_AGE}
          max={Driver.MAX_AGE}
          placeholder={t('form.attributes.birthday.placeholder')}
          value={this.state.driver.birthday}
          onChange={updateBirthday}
        />
        <small className="form-text text-muted">{t('form.attributes.birthday.smallText')}</small>
      </Col>
    )
  }

  radioButtoms() {
    return Driver.RADIO_BUTTON_FIELDS.map(property => {
      let item = this.props.t(`form.attributes.${property}`)
      let changeDriver = (option) => {
        let { driver } = this.state
        driver[item.name] = option.value
        this.setState({ driver })
      }

      return (
        <div key={property} className="mb-5">
          <Form.Label>{item.label}</Form.Label>
          <Row>
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
          { item.smallText && <small className="form-text text-muted">{item.smallText}</small> }
        </div>
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
      <>
        <FormContainer bootstrapProperties={{lg: 6}}>
          <h2 className="mb-5 font-weight-bold ">{title}</h2>
          <Form onSubmit={onSubmit}>

            <Row className="mb-5">
              { this.textInputs() }
              { this.ageInput()}
            </Row>

            { this.radioButtoms() }

            <Form.Label>{t('form.attributes.discounts.label')}</Form.Label>
            <div className="mb-5">
              { this.discounts() }
              <small className="form-text text-muted">{t('form.attributes.discounts.smallText')}</small>
            </div>


            <div className='w-75 mx-auto d-flex flex-column align-items-center'>
              <Button className='rounded-pill mb-3' size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('form.submit')}
              </Button>
              <Button onClick={cancelSubmit} variant='link' className='text-med-dark'><u>{t('form.cancel')}</u></Button>
            </div>
          </Form>
        </FormContainer>
        <BadgeText/>
      </>
    );
  }
}

export default withTranslation(['drivers'])(DriverForm)
