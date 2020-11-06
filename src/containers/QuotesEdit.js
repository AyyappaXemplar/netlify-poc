import { connect } from 'react-redux'
import QuotesEdit from '../components/main/QuotesEdit.js'
import { updateQuote } from '../actions/quotes.js'

const mapStateToProps = state => ({
  state: {
    updatingQuoteInfo: state.state.updatingQuoteInfo
  },
  data: { quote: state.data.quote }
})

const mapDispatchToProps = dispatch => ({
  updateQuote: quote      => dispatch(updateQuote(quote))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotesEdit)
