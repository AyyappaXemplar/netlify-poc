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
        use_code: false, year: false, manufacturer: false, model: 'taurus', trim: 'trim example'
      },
      options: VEHICLE_OPTIONS
    }

    this.handleSubmit = this.handleSubmit.bind(this);
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
    const vehicle = { ...this.state.vehicle }
    vehicle.year = year
    this.setState({ vehicle }, ()=> {
      Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/vehicles/${this.state.vehicle.year}/make/`)
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
    const vehicle = { ...this.state.vehicle }
    vehicle.manufacturer = manufacturer
    this.setState({ vehicle }, ()=> {
      Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/vehicles/${this.state.vehicle.year}/makes/${this.state.vehicle.manufacturer}/models`)
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
    this.setState({ model }, ()=> {
      Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/vehicles/${this.state.vehicle.year}/makes/${this.state.vehicle.manufacturer}/models/${this.state.vehicle.model}/trims`)
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
    this.setState({ trim })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { createVehicle } = this.props
    createVehicle(this.state)
  }

  render() {
    const { t } = this.props
    const enabled = Object.values(this.state).every(property => property)

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{md: {span: 6, offset: 3}}}>
          <h2 className="mb-5 font-weight-bold ">{t('vehiclesAdd:title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label>{t('vehiclesAdd:fields.vehicle.label')}</Form.Label>
            <div className='mb-3'>

              {t('vehiclesAdd:fields.vehicle.fields').map((item, index) =>
                <CustomSelect
                  item={item}
                  key={item.name}
                  options={this.state.options[item.name]}
                  onChange={this[`${item.name}Change`].bind(this)}/>
              )}

            </div>
            <Form.Label>{t('vehiclesAdd:fields.car.label')}</Form.Label>
            <div className='mb-5'>

              { t('vehiclesAdd:fields.car.useCode').map((item, index) =>
                <Radio
                  type={'radio'} id={`info-car-${item.value}`}
                  label={item.label}
                  value={item.value}
                  key={index}
                  selected={this.state.use_code === item.value}
                  onChange={() => this.setState({'use_code': item.value})}/>
              )}

            </div>
            <div className='w-75 mx-auto'>
              <Button size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('vehiclesAdd:submit')}
              </Button>
            </div>
          </Form>
        </FormContainer>
        <Container>
          <Row>
            <Col md={{span:6, offset: 3}}>
              <p className="small text-med-dark">
                <ShieldLogo className='mr-2'/>{t('common:badgeText')}
              </p>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTranslation(['vehiclesAdd', 'common'])(VehiclesAdd)
