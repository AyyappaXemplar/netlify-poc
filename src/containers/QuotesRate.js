import { connect } from 'react-redux'
import QuotesRate from '../components/main/QuotesRate'
// import { rateQuote }  from '../actions/quotes'

const mapStateToProps = (state, ownProps) => {
  const { quote } = state.data
  return {
    data: { quote }
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotesRate)
