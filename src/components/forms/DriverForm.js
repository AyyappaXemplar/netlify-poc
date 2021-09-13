import React from 'react';
import { Container, Row, Col, Form, Button, OverlayTrigger, Popover, Image } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import FormContainer from '../shared/FormContainer';
import BadgeText from '../shared/BadgeText';
import Radio from '../forms/Radio';
import history from '../../history';
import * as Driver from '../../constants/driver'
import { dateToAge, ageToDate } from '../../services/driver-age'
import { Helmet } from 'react-helmet'
import { connect } from "react-redux"
import { unsetHappyFoxVisitorInfo, setHappyFoxVisitorInfo } from "../shared/HFCMethods"
import infoLogo from "../../images/Info-2.svg"
export function goodStudentAvailable(driver) {
  const MAX_ELIGIBLE_STUDENT = 24
  const MIN_ELIGIBLE_STUDENT = 16
  return  driver.birthday >= MIN_ELIGIBLE_STUDENT &&
          driver.birthday <= MAX_ELIGIBLE_STUDENT &&
          driver.marital_status !== "married"
}

class DriverForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.driver,
      birthday: dateToAge(this.props.driver.birthday),
    }
    this.updateDriverState   = this.updateDriverState.bind(this)
    this.updateDriverGender  = this.updateDriverGender.bind(this)
    this.updateMaritalStatus = this.updateMaritalStatus.bind(this)
    this.updateLicenseStatus = this.updateLicenseStatus.bind(this)
  }
  popover() {
   return <Popover className="border-0 shadow-lg bg-white rounded" >
    <Popover.Content className="my-2">
      lorem
    </Popover.Content>
  </Popover>
  }
  updateDriverState(event) {
    event.preventDefault()
    const driver = this.state
    driver[event.target.name] = event.target.value || ''
    this.setState({ ...driver })
  }

  updateDriverGender(value) { this.setState({ gender: value }) }
  updateLicenseStatus(value) {
    this.setState(state => {
      if (value === 'foreign') {
        return { license_status: value, international_license: true }
      } else {
        return { license_status: value, international_license: false }
      }
    })
  }
  updateMaritalStatus(value) {
    this.setState(prev => {
      if (value === "married") {
        return { ...prev, marital_status: value, good_student: false }
      } else {
        return { ...prev, marital_status: value }
      }
    })
  }

  // social security
  creditStatus(value) {
    this.setState((prevState) => {
      return {...prevState, credit_score: value}
    })
  }
  cancelSubmit(event) {
    event.preventDefault()
    history.push(this.props.returnPath || '/quotes/drivers');
  }

  enableSubmit() {
    return Driver.PRESENT_FIELDS
      .map(field => this.state[field])
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
            name={item.name}
            value={this.state[item.name]}
            onChange={this.updateDriverState}
          />
          { item.smallText && <small className="form-text text-muted">{item.smallText}</small> }
        </Col>
      )
    })
  }

  ageInput() {
    const { t } = this.props
    const updateBirthday = (event) => {
      const driver = this.state
      driver.birthday = event.target.value

      if (goodStudentAvailable(driver)) {
        driver.good_student = false;
      }
      this.setState({ ...driver })
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
          value={this.state.birthday}
          onChange={updateBirthday}
        />
        <small className="form-text text-muted">{t('form.attributes.birthday.smallText')}</small>
      </Col>
    )
  }

  discounts() {
    return this.props.t('form.attributes.discounts.attributes').map(item => {
      let changeDriver = () => {
        const driver = this.state
        driver[item.name] = !driver[item.name]
        this.setState({ driver })
      }

      if (this.state.address.state !== 'IN' || item.name !== 'defensive_driver') {
        return(
          <Radio
            key={item.name}
            type='checkbox'
            label={item.label}
            value={this.state[item.name]}
            selected={this.state[item.name]}
            onChange={changeDriver.bind(this)}
            disabled={this.checkDisabled(item)}
          />
        )
      } else return null
    })
  }

  checkDisabled(discount) {
    if (discount.name !== "good_student") {
      return false
    }

    const driver = this.state
    return !goodStudentAvailable(driver)
  }

  render() {
    const { t, title, handleSubmit, avoidCancel } = this.props
    const driver = this.state
    const enabled = this.enableSubmit()
    const cancelSubmit = this.cancelSubmit.bind(this)
    const onSubmit = (event) => {
      event.persist()
      let birthday = ageToDate(this.state.birthday)
      this.setState({ ...this.state, birthday }, () => handleSubmit(event, this.state))

      if (this.props.driverSelection.length < 1) {
        unsetHappyFoxVisitorInfo()
        setHappyFoxVisitorInfo(driver.first_name, driver.last_name)
      }
    }
    return (
      <Container className="pt-base">
        <Helmet>
          <title>Add driver | InsureOnline.com</title>
        </Helmet>
        <FormContainer bootstrapProperties={{lg: 6}}>
          <h2 className="mb-5 font-weight-bold ">{title}</h2>
          <Form onSubmit={onSubmit}>

            <Row className="mb-5">
              { this.textInputs() }
              { this.ageInput() }
            </Row>

            <div key='gender' className="mb-5">
              <Form.Label>{t('form.attributes.gender.label')}</Form.Label>
              <Row>
                { t('form.attributes.gender.options').map(option =>
                  <Col xs={12} sm={6} key={option.value}>
                    <Radio
                      type={'radio'} id={`driver-${option.value}`}
                      name='gender'
                      label={option.label}
                      value={option.value}
                      selected={driver.gender === option.value}
                      onChange={() => this.updateDriverGender(option.value)}
                    />
                  </Col>
                )}
              </Row>
              <small className="form-text text-muted">{t('form.attributes.gender.smallText')}</small>
            </div>

            <div key='maritalStatus' className="mb-5">
              <Form.Label>{t('form.attributes.maritalStatus.label')}</Form.Label>
              <Row>
                {t('form.attributes.maritalStatus.options').map( option =>
                  <Col xs={12} sm={6} key={option.value}>
                    <Radio
                      type={'radio'} id={`driver-${option.value}`}
                      name="marital_status"
                      label={option.label}
                      value={option.value}
                      selected={driver.marital_status === option.value}
                      onChange={() => this.updateMaritalStatus(option.value)}
                    />
                  </Col>
                )}
              </Row>
            </div>
            {/* credit score section */}
            {(driver.policyholder || driver.policy_holder) && <div className="mb-5">
              <Form.Label>{t('form.attributes.creditScoreStatus.label')} <OverlayTrigger
                trigger={['hover', 'focus']}
                key="top"
                placement="top"
                overlay={this.popover()}
              >
                <Image className="d-inline rounded-circle ml-1" src={infoLogo} alt="info logo" style={{ width: "14px", height: "14px" }} />
              </OverlayTrigger></Form.Label>
              <Row>
                {t('form.attributes.creditScoreStatus.options').map(option =>
                  <Col xs={12} sm={6} key={option.value}>
                    <Radio
                      type={'radio'} id={`driver-${option.value}`}
                      name="creditScoreStatus"
                      label={option.label}
                      value={option.value}
                      selected={driver.credit_score === option.value}
                      onChange={() => this.creditStatus(option.value)}
                    />
                  </Col>
                )}
              </Row>
              <small className='form-text text-muted'>Select "Good" if your not sure</small>
            </div>}
            {/* end */}
            <div key='licenseStatus' className="mb-5">
              <Form.Label>{t('form.attributes.licenseStatus.label')}</Form.Label>
              <Row>
                {t('form.attributes.licenseStatus.options').map( option =>
                  <Col xs={12} sm={6} key={option.value}>
                    <Radio
                      type={'radio'} id={`driver-${option.value}`}
                      name="licenseStatus"
                      label={option.label}
                      value={option.value}
                      selected={driver.license_status === option.value}
                      onChange={() => this.updateLicenseStatus(option.value)}
                    />
                  </Col>
                )}
              </Row>
            </div>
            { driver.license_status !== "not_licensed" &&
              <div>
                <Form.Label>{t('form.attributes.discounts.label')}</Form.Label>
                <div className="mb-5">
                  { this.discounts() }
                  <small className="form-text text-muted">{t('form.attributes.discounts.smallText')}</small>
                </div>
              </div>
            }

            <div className='w-75 mx-auto d-flex flex-column align-items-center'>
              <Button className='rounded-pill mb-3' size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('form.submit')}
              </Button>

              {
                !avoidCancel &&
                <Button onClick={cancelSubmit} variant='link' className='text-med-dark text-decoration-none'>
                  {t('form.cancel')}
                </Button>
              }
            </div>
          </Form>
        </FormContainer>

        <BadgeText/>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    driverSelection: state.data.quote.drivers
  }
}

export default connect(mapStateToProps)(withTranslation(['drivers'])(DriverForm))
