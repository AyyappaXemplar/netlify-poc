import { connect } from 'react-redux'
import Vehicle from '../components/quote/Vehicle.js'
import { deleteVehicle }  from '../actions/vehicles.js'

const mapDispatchToProps = dispatch => ({
  deleteVehicle: (vehicleId) => dispatch(deleteVehicle(vehicleId))
})

export default connect(
  null,
  mapDispatchToProps
)(Vehicle)
