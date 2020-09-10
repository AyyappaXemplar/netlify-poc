import { connect } from 'react-redux'
import DriversEdit from '../components/main/DriversEdit'
import { setAlert, setProgress }  from '../actions/state'
import { updateDriver }  from '../actions/drivers'

const mapStateToProps = (state, ownProps) => {
  return {
    data: { drivers: state.data.drivers },
    state: { updatingDriver: state.state.updatingDriver }
  }
}

const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  setProgress: progress => dispatch(setProgress(progress)),
  updateDriver: (driverId, driver) => dispatch(updateDriver(driverId, driver)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriversEdit)
