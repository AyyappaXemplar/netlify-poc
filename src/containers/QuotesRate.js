import { connect } from 'react-redux'
import QuotesRate from '../components/main/QuotesRate'
import { deleteDriver }  from '../actions/drivers'

const mapStateToProps = (state, ownProps) => {
  const { quote } = state.data
  return {
    data: { quote }
  }
}

const mapDispatchToProps = dispatch => ({
  deleteDriver: driverId => dispatch(deleteDriver(driverId))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotesRate)
