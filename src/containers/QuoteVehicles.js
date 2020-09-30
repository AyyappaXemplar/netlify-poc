import { connect } from 'react-redux'
import QuoteVehicles from '../components/shared/QuoteVehicles.js'
import { setAlert }  from '../actions/state.js'

const mapStateToProps = (state, ownProps) => ({ data: state.data })

const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteVehicles)
