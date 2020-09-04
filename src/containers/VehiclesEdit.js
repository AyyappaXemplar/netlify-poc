import { connect } from 'react-redux'
import VehiclesEdit from '../components/main/VehiclesEdit'
import { setAlert, setProgress }  from '../actions/state'
import { updateVehicle }  from '../actions/vehicles'

const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  setProgress: progress => dispatch(setProgress(progress)),
  updateVehicle: (vehicleId, vehicle) => dispatch(updateVehicle(vehicleId, vehicle)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehiclesEdit)
