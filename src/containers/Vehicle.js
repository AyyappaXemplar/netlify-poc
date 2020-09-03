import { connect } from 'react-redux'
import Vehicle from '../components/shared/Vehicle.js'
import { deleteVehicle }  from '../actions/vehicles.js'//updateVehicle,

const mapDispatchToProps = dispatch => ({
  deleteVehicle: (vehicleId) => dispatch(deleteVehicle(vehicleId))
})

export default connect(
  null,
  mapDispatchToProps
)(Vehicle)
