import { connect } from 'react-redux'
import QuotesNew from '../components/main/QuotesNew.js'
import { createQuote } from '../actions/quotes.js'

const mapStateToProps = state => ({
  state: { verifyingZip: state.state.verifyingZip }
})

const mapDispatchToProps = dispatch => ({
  createQuote: zip      => dispatch(createQuote(zip)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotesNew)
