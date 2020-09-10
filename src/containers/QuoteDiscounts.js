import { connect } from 'react-redux'
import QuoteDiscounts from '../components/shared/QuoteDiscounts.js'

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
