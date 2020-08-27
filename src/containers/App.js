import { connect } from 'react-redux'
import App from '../components/App.js'
import { setAlert, setProgress }  from '../actions/state.js'
import { createQuote, updateQuote } from '../actions/quotes.js'
import { createVehicle, updateVehicle } from '../actions/vehicles.js'

const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  setProgress: progress => dispatch(setProgress(progress)),
  createQuote: zip      => dispatch(createQuote(zip)),
  updateQuote: (quoteId, quoteParams) => dispatch(updateQuote(quoteId, quoteParams)),
  createVehicle: (vehicle)   => dispatch(createVehicle(vehicle)),
  updateVehicle: (quoteId, vehicleId, vehicleParams) => dispatch(updateVehicle(quoteId, vehicleId, vehicleParams))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
