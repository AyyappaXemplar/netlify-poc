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

class VehiclesAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = { use_code: false, year: false, manufacturer: false, model: 'taurus', trim: 'trim example' }
    this.options = VEHICLE_OPTIONS
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

  handleSubmit(event) {
    event.preventDefault()
    const { createVehicle } = this.props
    createVehicle(this.state)
  }

  yearChange(element, other) {
    const year = element[0].value
    this.setState({ year })
  }

  manufacturerChange(element) {
    const manufacturer = element[0].value
    this.setState({ manufacturer })
  }

  modelChange(element) {
    const model = element[0].value
    this.setState({ model })
  }

  trimChange(element) {
    const trim = element[0].value
    this.setState({ trim })
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
                  options={this.options[item.name]}
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
