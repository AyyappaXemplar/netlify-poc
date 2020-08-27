import { connect } from 'react-redux'
import App from '../components/App.js'
import { setAlert, setProgress }  from '../actions/state.js'
import { createQuote, updateQuote } from '../actions/quotes.js'

const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = dispatch => ({
  setAlert: alert => dispatch(setAlert(alert)),
  setProgress: progress => dispatch(setProgress(progress)),
  createQuote: zip => dispatch(createQuote(zip)),
  updateQuote: quote => dispatch(updateQuote(quote))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
