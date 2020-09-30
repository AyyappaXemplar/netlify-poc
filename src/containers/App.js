import { connect } from 'react-redux'
import App from '../components/App.js'
import { setAlert, setProgress }  from '../actions/state.js'
import { getQuote }  from '../actions/quotes.js'

const mapStateToProps = (state, ownProps) => ({
  state: {
    alert: state.state.alert,
    progress: state.state.progress,
    gettingQuote: state.state.gettingQuote
  },
  data: {
    quote: state.data.quote
  }
})
const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  setProgress: progress => dispatch(setProgress(progress)),
  getQuote: (quoteId) => dispatch(getQuote(quoteId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
