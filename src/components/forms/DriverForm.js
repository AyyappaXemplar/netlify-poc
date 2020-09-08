import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import FormContainer from '../shared/FormContainer';
import Radio from '../forms/Radio';

class DriverForm extends React.Component {
  // MIN_SEARCH_CHARS = 4

  constructor(props) {
    super(props)
    this.state = { driver: this.props.driver }
  }

  radios({ label, value, selected, onChange}) {
    return (
      <Radio
        type={'radio'}
        id={`driver-${value}`}
        label={label}
        value={value}
        key={`driver-${value}`}
        selected={selected}
        onChange={onChange}
      />
    )
  }

  updateVehicleState(item, event) {
    event.preventDefault()
    const { driver } = this.state
    const attributeName = this.props.t(`form.attributes.${item}.name`)
    driver[attributeName] = event.target.value
    this.setState({ driver })
  }

  cancelSubmit(event) {
    event.preventDefault()
    this.props.history.goBack();
  }

  enableSubmit() {
    const { driver } = this.state
    const valuesPresent = Object.values(driver).every(property => property)
    const objectPresent = !!Object.keys(driver).length

    return objectPresent && valuesPresent
  }

  render() {
    const { t, title, handleSubmit } = this.props
    const enabled = this.enableSubmit()
    const cancelSubmit = this.cancelSubmit.bind(this)
    const onSubmit = (event) => handleSubmit(event, this.state.driver)
    // const updateVehicleState = (event, item) => this.updateVehicleState(event, item).bind(this)

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{lg: 6}}>
          <h2 className="mb-5 font-weight-bold ">{title}</h2>
          <Form onSubmit={onSubmit}>

          <Row className="mb-5">
            { ['firstName', 'lastName', 'birthday'].map(item => (
              <Col className='mb-3' xs={12} sm={6} key={`${item}`}>
                <Form.Label>{t(`form.attributes.${item}.label`)}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t(`form.attributes.${item}.placeholder`)}
                  value={this.state.driver[item.name]}
                  onChange={this.updateVehicleState.bind(this, item)}
                />
              </Col>
            )) }
          </Row>

          { ['maritalStatus', 'licenseStatus'].map(item => (
            <Row className="mb-5">
              <Col>
                <Form.Label>{t(`form.attributes.${item}.label`)}</Form.Label>
              </Col>
            </Row>
          )) }


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
