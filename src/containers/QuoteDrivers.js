import { connect } from 'react-redux'
import QuoteDrivers from '../components/shared/QuoteDrivers.js'
import { setAlert }  from '../actions/state.js'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = dispatch => ({
  setAlert: alert => dispatch(setAlert(alert))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteDrivers)
