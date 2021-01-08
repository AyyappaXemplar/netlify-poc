import { connect } from 'react-redux'
import Vehicle from '../../conversation/quote/Vehicle'
import { deleteVehicle }  from '../../../../actions/vehicles'


const mapDispatchToProps = dispatch => ({
  deleteVehicle: (vehicleId) => dispatch(deleteVehicle(vehicleId))
})

export default connect(
  null,
  mapDispatchToProps
)(Vehicle)
