import React from 'react';
import { withTranslation } from 'react-i18next';
import VehicleForm from '../forms/VehicleForm';
import history from '../../history';
import { groupedCoverages } from '../../services/coverages'

class VehiclesNew extends React.Component {
  vehicle = { use_code: false, year: false, manufacturer: false, model: false, trim: false,
              coverages: groupedCoverages.LIABILITY }
  // vehicle = { use_code: 'commuting', year: '2020', manufacturer: 'ford', model: 'focus', trim: '3.5',
              // coverages: groupedCoverages.LIABILITY
            // }

  constructor(props) {
    super(props)
    this.createVehicle = this.createVehicle.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUpdate = prevProps.state.creatingVehicle
    const { creatingVehicle } = this.props.state
    const requestFired = prevUpdate && !creatingVehicle

    const prevVehicles = prevProps.data.quote.vehicles
    const vehicles = this.props.data.quote.vehicles
    const vehicleAdded = prevVehicles.length < vehicles.length

    if (requestFired && vehicleAdded) {
      history.push('/quotes/vehicles')
    }
  }

  createVehicle(event, vehicle) {
    event.preventDefault()
    this.props.createVehicle(vehicle)
  }

  render() {
    const { t } = this.props
    return (
      <VehicleForm handleSubmit={this.createVehicle} title={t('new.title')} vehicle={this.vehicle} allowVehicleSearch={true}/>
    );
  }
}

export default withTranslation(['vehicles'])(VehiclesNew)
