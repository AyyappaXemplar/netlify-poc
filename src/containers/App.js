import { connect } from 'react-redux'
import App from '../components/App.js'
import { setAlert, setProgress }  from '../actions/state.js'
import { verifyZip, updateQuote } from '../actions/data.js'

const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = dispatch => ({
  setAlert: alert => dispatch(setAlert(alert)),
  setProgress: progress => dispatch(setProgress(progress)),
  verifyZip: zip => dispatch(verifyZip(zip)),
  updateQuote: quote => dispatch(updateQuote(quote))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
