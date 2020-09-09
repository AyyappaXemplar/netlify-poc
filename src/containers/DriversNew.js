import { connect } from 'react-redux'
import DriversNew from '../components/main/DriversNew'
import { setAlert, setProgress }  from '../actions/state'
import { createDriver }  from '../actions/drivers'

const mapStateToProps = (state, ownProps) => {
  return {
    state: { creatingDriver: state.state.creatingDriver },
    data:  { drivers:        state.data.drivers        }
  }
}
const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  setProgress: progress => dispatch(setProgress(progress)),
  createDriver: (driverId, driver) => dispatch(createDriver(driverId, driver)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriversNew)
