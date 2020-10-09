import { connect } from 'react-redux'
import QuotesSubmit from '../components/main/QuotesSubmit'
import { rateQuote }  from '../actions/quotes'

const mapStateToProps = (state, ownProps) => {
  return {
    state: {
      ratingQuote: state.state.ratingQuote
    },

    data: { quote: state.data.quote }
  }
}

const mapDispatchToProps = dispatch => ({
  rateQuote: () => dispatch(rateQuote())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotesSubmit)
