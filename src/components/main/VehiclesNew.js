import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import FormContainer from '../shared/FormContainer';
import CustomSelect from '../forms/CustomSelect';
import Radio from '../forms/Radio';
import history from '../../history';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import { VEHICLE_OPTIONS } from '../../constants/vehicle-options';
import Axios from 'axios';

class VehiclesAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: {
        use_code: false, year: false, manufacturer: false, model: false, trim: false
      },
      options: VEHICLE_OPTIONS
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.apiBaseUrl   = process.env.REACT_APP_API_BASE_URL
    this.apiNamespace = process.env.REACT_APP_API_NAMESPACE
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.DRIVERS)
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUpdate = prevProps.state.creatingVehicle
    const { creatingVehicle } = this.props.state
    const requestFired = prevUpdate && !creatingVehicle

    const prevVehicles = prevProps.data.vehicles.length
    const vehicles = this.props.data.vehicles.length
    const vehicleAdded = prevVehicles < vehicles

    if (requestFired & vehicleAdded) {
      history.push('/vehicles')
    }
  }

  yearChange(element, other) {
    const year = element[0].value
    const vehicle = this.state.vehicle
    vehicle.year = year

    this.setState({ vehicle }, ()=> {
      const url = `${this.apiBaseUrl}/${this.apiNamespace}/vehicles/${this.state.vehicle.year}/make/`
      Axios.get(url)
        .then(response => {
          const { makes } = response.data;
          let options = { ...this.state.options }
          const manufacturer = makes.map(item => { return { label: item.name, value: item.name } })
          options.manufacturer = manufacturer
          this.setState({ options })
        })
    })
  }

  manufacturerChange(element) {
    const manufacturer = element[0].value
    const vehicle = this.state.vehicle
    vehicle.manufacturer = manufacturer

    this.setState({ vehicle }, ()=> {
      const url = `${this.apiBaseUrl}/${this.apiNamespace}/vehicles/${this.state.vehicle.year}` +
                  `/makes/${this.state.vehicle.manufacturer}/models`
      Axios.get(url)
        .then(response => {
          let options = { ...this.state.options }
          const models = response.data.map(item => { return { label: item.name, value: item.name } })
          options.model = models
          this.setState({ options })
        })
    })
  }

  modelChange(element) {
    const model = element[0].value
    const vehicle = this.state.vehicle
    vehicle.model = model

    this.setState({ vehicle }, ()=> {
      const url = `${this.apiBaseUrl}/${this.apiNamespace}/vehicles/${this.state.vehicle.year}` +
                  `/makes/${this.state.vehicle.manufacturer}/models/${this.state.vehicle.model}/trims`
      Axios.get(url)
        .then(response => {
          let options = { ...this.state.options }
          const trims = response.data.map(item => { return { label: item.trim, value: item.id } })
          options.trim = trims
          this.setState({ options })
        })
    })
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

  handleSubmit(event) {
    event.preventDefault()
    const { createVehicle } = this.props
    createVehicle(this.state.vehicle)
  }

  render() {
    const { t } = this.props
    const enabled = Object.values(this.state.vehicle).every(property => property)
    const useCodeChange = item => {
      this.useCodeChange(item)
    }

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{lg: 6}}>
          <h2 className="mb-5 font-weight-bold ">{t('vehiclesNew:title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label>{t('vehiclesNew:fields.vehicle.label')}</Form.Label>
            <div className='mb-3'>

              {t('vehiclesNew:fields.vehicle.fields').map((item, index) =>
                <CustomSelect
                  item={item}
                  key={item.name}
                  options={this.state.options[item.name]}
                  onChange={this[`${item.name}Change`].bind(this)}/>
              )}

            </div>
            <Form.Label>{t('vehiclesNew:fields.use.label')}</Form.Label>
            <div className='mb-5'>

              { t('vehiclesNew:fields.use.useCodevalues').map((item, index) =>
                <Radio
                  type={'radio'} id={`info-car-${item}`}
                  label={t(`vehiclesNew:fields.use.useCode.${item}.label`)}
                  value={t(`vehiclesNew:fields.use.useCode.${item}.label`)}
                  key={index}
                  selected={this.state.vehicle.use_code === item}
                  onChange={() => useCodeChange(item)}/>
              )}

            </div>
            <div className='w-75 mx-auto'>
              <Button className='rounded-pill' size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('vehiclesNew:submit')}
              </Button>
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

export default withTranslation(['vehiclesNew', 'common'])(VehiclesAdd)
