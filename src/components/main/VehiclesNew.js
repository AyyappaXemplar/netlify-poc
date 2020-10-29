import React from 'react';
import { withTranslation } from 'react-i18next';
import VehicleForm from '../forms/VehicleForm';
import history from '../../history';
import { groupedCoverages } from '../../services/coverages'

class VehiclesNew extends React.Component {
  vehicle = { use_code: false, year: false, manufacturer: false, model: false, trim: false,
              coverages: groupedCoverages.GOOD, liability_only: false, logo_url: '',
              coverage_package_name: "GOOD" }
  // vehicle = { use_code: 'commuting', year: '2020', manufacturer: 'ford', model: 'focus', trim: '3.5',
              // coverages: groupedCoverages.LIABILITY, logo_url: '',
            // coverage_package_name: "GOOD" }

  constructor(props) {
    super(props)
    this.state = { vehicle: {}}
    this.createVehicle = this.createVehicle.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUpdate = prevProps.state.creatingVehicle
    const { creatingVehicle } = this.props.state
    const requestFired = prevUpdate && !creatingVehicle

    const prevVehicles = prevProps.data.quote.vehicles
    const vehicles = this.props.data.quote.vehicles
    const vehicleAdded = prevVehicles.length < vehicles.length

    if (!requestFired || !vehicleAdded) {
      return
    }

    const date = new Date();
    const currentYear = date.getFullYear();

    if (parseInt(this.state.vehicle.year) + 7 >= currentYear)
      history.push('/quotes/vehicles')
    else {
      const vehicleId = vehicles[vehicles.length - 1].id
      history.push(`/vehicles/${vehicleId}/edit-coverages`)
    }
  }

  createVehicle(event, vehicle) {
    event.preventDefault()
    this.setState({ vehicle }, () => { this.props.createVehicle(vehicle) })
  }

  render() {
    const { t } = this.props
    const avoidCancel = this.props.data.quote.vehicles.length === 0;
    console.log("avoidCancel !!!: ", avoidCancel);

    return (
      <VehicleForm handleSubmit={this.createVehicle} title={t('new.title')} vehicle={this.vehicle} allowVehicleSearch={true} avoidCancel={avoidCancel}/>
    );
  }
}

export default withTranslation(['vehicles'])(VehiclesNew)
