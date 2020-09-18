import { connect } from 'react-redux'
import Quotes from '../components/main/Quotes.js'
import { setAlert, setProgress }  from '../actions/state.js'

const mapStateToProps = (state, ownProps) => {
  return {
    data: {
      vehicles: state.data.vehicles,
      drivers:  state.data.drivers
    }
  }
}
const mapDispatchToProps = dispatch => ({
  setAlert: alert       => dispatch(setAlert(alert)),
  setProgress: progress => dispatch(setProgress(progress)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quotes)
