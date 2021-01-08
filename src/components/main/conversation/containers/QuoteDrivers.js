import { connect } from 'react-redux'
import QuoteDrivers from '../../conversation/quote/Driver'
import { setAlert }  from  "../../../../actions/state"

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = dispatch => ({
  setAlert: alert => dispatch(setAlert(alert))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteDrivers)
