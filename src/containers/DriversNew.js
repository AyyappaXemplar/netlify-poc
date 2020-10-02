import { connect } from 'react-redux'
import DriversNew from '../components/main/DriversNew'
import { setAlert }  from '../actions/state'
import { createDriver }  from '../actions/drivers'

const mapStateToProps = (state, ownProps) => {
  return {
    state: { creatingDriver: state.state.creatingDriver },
    data:  state.data
  }
}
const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  createDriver: (driverId, driver) => dispatch(createDriver(driverId, driver))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriversNew)
