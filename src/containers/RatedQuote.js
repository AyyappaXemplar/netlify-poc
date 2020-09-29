import { connect } from 'react-redux'
import RatedQuote from '../components/main/RatedQuote'
import { deleteDriver }  from '../actions/drivers'
import { updateVehicleCoverages }  from '../actions/vehicles'

const mapStateToProps = (state, ownProps) => {
  const { quote } = state.data
  return {
    data: { quote }
  }
}

const mapDispatchToProps = dispatch => ({
  deleteDriver: driverId => dispatch(deleteDriver(driverId)),
  updateVehicleCoverages: (vehicleId, coverageLevel) => updateVehicleCoverages(vehicleId, coverageLevel)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatedQuote)
