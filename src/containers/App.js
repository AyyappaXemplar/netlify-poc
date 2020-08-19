import { connect } from 'react-redux'
import App from '../components/App.js'
import { getData } from '../actions/data'
import { setState } from '../actions/state'
import { setAlert } from '../actions/state'

const mapStateToProps = (state, ownProps) => state

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData()),
  setState: state => dispatch(setState(state)),
  setAlert: alert => dispatch(setAlert(alert)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
