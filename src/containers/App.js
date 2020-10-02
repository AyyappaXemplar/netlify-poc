import { connect } from 'react-redux'
import App from '../components/App.js'
import { setAlert }  from '../actions/state.js'
import { getQuote }  from '../actions/quotes.js'

const mapStateToProps = (state, ownProps) => ({
  state: {
    alert: state.state.alert,
    gettingQuote: state.state.gettingQuote
  },
  data: {
    quote: state.data.quote
  }
})
const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  getQuote: (quoteId) => dispatch(getQuote(quoteId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
