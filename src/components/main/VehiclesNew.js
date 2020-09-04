import React from 'react';
import { withTranslation } from 'react-i18next';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import VehicleForm from '../forms/VehicleForm';
import history from '../../history';

class VehiclesNew extends React.Component {
  vehicle = {
    use_code: 'commuting', year: '2020', manufacturer: 'ford', model: 'focus', trim: '3.5'
    // use_code: false, year: false, manufacturer: false, model: false, trim: false
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(event, vehicle) {
    event.preventDefault()
    const { createVehicle } = this.props
    createVehicle(vehicle)
  }

  render() {
    const { t } = this.props
    return (
      <VehicleForm handleSubmit={this.handleSubmit} title={t('title')} vehicle={this.vehicle}/>
    );
  }
}

export default withTranslation(['vehiclesNew'])(VehiclesNew)
