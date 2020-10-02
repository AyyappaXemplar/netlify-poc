import { connect } from 'react-redux'
import VehiclesEdit from '../components/main/VehiclesEdit'
import { setAlert }  from '../actions/state'
import { updateVehicle }  from '../actions/vehicles'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data,
    state: { updatingVehicle: state.state.updatingVehicle }
  }
}
const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  updateVehicle: (vehicleId, vehicle) => dispatch(updateVehicle(vehicleId, vehicle))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehiclesEdit)
