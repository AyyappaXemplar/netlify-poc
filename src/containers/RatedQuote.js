import { connect } from 'react-redux'
import RatedQuote from '../components/main/RatedQuote'
import { deleteDriver }  from '../actions/drivers'
import { updateVehicleCoverages }  from '../actions/vehicles'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = dispatch => ({
  deleteDriver: driverId => dispatch(deleteDriver(driverId)),
  updateVehicleCoverages: (vehicleId, coverageLevel) => dispatch(updateVehicleCoverages(vehicleId, coverageLevel))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatedQuote)