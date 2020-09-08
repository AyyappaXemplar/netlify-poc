import React from 'react';
import { withTranslation } from 'react-i18next';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import VehicleForm from '../forms/VehicleForm';
import history from '../../history';

class VehiclesNew extends React.Component {
  vehicle = { use_code: false, year: false, manufacturer: false, model: false, trim: false }
  // vehicle = { use_code: 'commuting', year: '2020', manufacturer: 'ford', model: 'focus', trim: '3.5' }

  constructor(props) {
    super(props)
    this.createVehicle = this.createVehicle.bind(this)
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.VEHICLES)
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUpdate = prevProps.state.creatingVehicle
    const { creatingVehicle } = this.props.state
    const requestFired = prevUpdate && !creatingVehicle

    const prevVehicles = prevProps.data.vehicles.length
    const vehicles = this.props.data.vehicles.length
    const vehicleAdded = prevVehicles < vehicles

    if (requestFired & vehicleAdded) {
      history.push('/quote')
    }
  }

  createVehicle(event, vehicle) {
    event.preventDefault()
    this.props.createVehicle(vehicle)
  }

  render() {
    const { t } = this.props
    return (
      <VehicleForm handleSubmit={this.createVehicle} title={t('title')} vehicle={this.vehicle} allowVehicleSearch={true}/>
    );
  }
}

export default withTranslation(['vehiclesNew'])(VehiclesNew)
