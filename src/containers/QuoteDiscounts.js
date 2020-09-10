import { connect } from 'react-redux'
import QuoteDiscounts from '../components/shared/QuoteDiscounts.js'
import { setAlert }  from '../actions/state.js'

const mapStateToProps = (state, ownProps) => {
  return {
    data: {
      discounts: state.data.discounts
    }
  }
}

export default connect(
  mapStateToProps,
  {}
)(QuoteDiscounts)
