import React from 'react';
import { withTranslation } from 'react-i18next';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import VehicleForm from '../forms/VehicleForm';
import history from '../../history';

class VehiclesEdit extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { vehicle: false }
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.VEHICLES)
    this.findVehicle()
  }

  findVehicle() {
    const vehicleId = this.props.match.params.vehicleId
    const vehicle = this.props.data.vehicles.find(vehicle => vehicle.id === vehicleId)
    this.setState({ vehicle })
    // this.setState({ vehicle: { use_code: 'farming', year: '2020', manufacturer: 'Acura', model: 'Acura TLX', trim: 'veh_12345' } })
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUpdate = prevProps.state.updatingVehicle
    const { updatingVehicle } = this.props.state
    const requestFired = prevUpdate && !updatingVehicle

    if (requestFired) {
      history.push('/vehicles')
    }
  }

  handleSubmit(event, vehicle) {
    event.preventDefault()
    const { updateVehicle } = this.props
    updateVehicle(vehicle.id, vehicle)
  }

  render() {
    if (!this.state.vehicle) return false

    const { t } = this.props

    return (
      <VehicleForm handleSubmit={this.handleSubmit} title={t('title')} vehicle={this.state.vehicle}/>
    );
  }
}

export default withTranslation(['vehiclesEdit'])(VehiclesEdit)
