import { connect } from 'react-redux'
import VehiclesNew from '../components/main/VehiclesNew'
import { setAlert }  from '../actions/state'
import { createVehicle }  from '../actions/vehicles'

const mapStateToProps = (state, ownProps) => {
  const { creatingVehicle } = state.state
  const { data } = state

  return { state: { creatingVehicle }, data }
}
const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  createVehicle: (vehicleId, vehicle) => dispatch(createVehicle(vehicleId, vehicle))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehiclesNew)
