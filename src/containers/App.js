import { connect } from 'react-redux'
import App from '../components/App.js'
import { setAlert, setProgress } from '../actions/state.js'

const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = dispatch => ({
  setAlert: alert => dispatch(setAlert(alert)),
  setProgress: progress => dispatch(setProgress(progress))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
