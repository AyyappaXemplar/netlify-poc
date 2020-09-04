import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import FormContainer from '../shared/FormContainer';
import CustomSelect from '../forms/CustomSelect';
import Radio from '../forms/Radio';
import vehicleOptions from '../../services/vehicle-options';
import Axios from 'axios';

class VehicleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { vehicle: this.props.vehicle, options: vehicleOptions }

    this.apiBaseUrl   = process.env.REACT_APP_API_BASE_URL
    this.apiNamespace = process.env.REACT_APP_API_NAMESPACE
  }

  yearChange(element, other) {
    const year = element[0].value
    const vehicle = this.state.vehicle
    vehicle.year = year

    this.setState({ vehicle }, ()=> this.setManufacturerOption())
  }

  manufacturerChange(element) {
    const manufacturer = element[0].value
    const vehicle = this.state.vehicle
    vehicle.manufacturer = manufacturer

    this.setState({ vehicle }, ()=> this.setModelOption())
  }

  modelChange(element) {
    const model = element[0].value
    const vehicle = this.state.vehicle
    vehicle.model = model

    this.setState({ vehicle }, ()=> this.setTripOptions())
  }

  trimChange(element) {
    const trim = element[0].value
    const vehicle = this.state.vehicle
    vehicle.trim = trim
    this.setState({ vehicle })
  }

  useCodeChange(value) {
    const vehicle = this.state.vehicle
    vehicle.use_code = value
    this.setState({ vehicle })
  }

  setManufacturerOption() {
    const url = `${this.apiBaseUrl}/${this.apiNamespace}/vehicles/${this.state.vehicle.year}/make/`
    Axios.get(url)
      .then(response => {
        const { makes } = response.data;
        let options = { ...this.state.options }
        const manufacturer = makes.map(item => { return { label: item.name, value: item.name } })
        options.manufacturer = manufacturer
        this.setState({ options })
      })
  }

  setModelOption() {
    const url = `${this.apiBaseUrl}/${this.apiNamespace}/vehicles/${this.state.vehicle.year}` +
                  `/makes/${this.state.vehicle.manufacturer}/models`
    Axios.get(url)
      .then(response => {
        let options = { ...this.state.options }
        const models = response.data.map(item => { return { label: item.name, value: item.name } })
        options.model = models
        this.setState({ options })
      })
  }

  setTripOptions() {
    const url = `${this.apiBaseUrl}/${this.apiNamespace}/vehicles/${this.state.vehicle.year}` +
                  `/makes/${this.state.vehicle.manufacturer}/models/${this.state.vehicle.model}/trims`
    Axios.get(url)
      .then(response => {
        let options = { ...this.state.options }
        const trims = response.data.map(item => { return { label: item.trim, value: item.id } })
        options.trim = trims
        this.setState({ options })
      })
  }

  useCodeRadios() {
    const { t } = this.props

    return t('fields.use.useCodevalues').map((item, index) => {
      let label = t(`fields.use.useCode.${item}.label`)
      let value = t(`fields.use.useCode.${item}.value`)
      let onChange = () => this.useCodeChange(value)

      return (
        <Radio
          type={'radio'} id={`info-car-${value}`}
          label={label}
          value={value}
          key={index}
          selected={this.state.vehicle.use_code === value}
          onChange={onChange}
        />
      )
    })
  }

  cancelSubmit(event) {
    event.preventDefault()
    this.props.history.goBack();
  }

  render() {
    const { t, title, handleSubmit } = this.props
    const enabled = Object.values(this.state.vehicle).every(property => property)
    const cancelSubmit = this.cancelSubmit.bind(this)
    const onSubmit = (event) => handleSubmit(event, this.state.vehicle)
    const useCodeRadios = this.useCodeRadios()

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{lg: 6}}>
          <h2 className="mb-5 font-weight-bold ">{title}</h2>
          <Form onSubmit={onSubmit}>

            <div className='mb-5'>
              <Form.Label>{t('fields.vehicle.label')}</Form.Label>

              {t('fields.vehicle.fields').map((item, index) =>
                <CustomSelect
                  searchable={false}
                  value={this.state.vehicle[item.name]}
                  placeholder={item.label}
                  name={item.name}
                  key={item.name}
                  options={this.state.options[item.name]}
                  onChange={this[`${item.name}Change`].bind(this)}
                />
              )}
            </div>

            <Form.Label>{t('fields.use.label')}</Form.Label>
            <div className='mb-5'>
              {useCodeRadios}
            </div>
            <div className='w-75 mx-auto d-flex flex-column align-items-center'>
              <Button className='rounded-pill mb-3' size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('submit')}
              </Button>
              <Button onClick={cancelSubmit} variant='link' className='text-med-dark'><u>{t('cancel')}</u></Button>
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

export default withTranslation(['vehiclesNew', 'common'])(VehicleForm)
