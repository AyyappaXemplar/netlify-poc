import { connect } from 'react-redux'
// import QuoteVehicles from '../../../../components/conversation/quote/Vehicles.js'
import QuoteVehicles from '../../../../components/main/conversation/quote/Vehicles'
// import { setAlert } from '../actions/state.js'
import { setAlert }  from '../../../../actions/state'

const mapStateToProps = (state, ownProps) => ({ data: state.data })

const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteVehicles)
