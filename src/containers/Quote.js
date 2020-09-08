import { connect } from 'react-redux'
import Quote from '../components/main/Quote.js'
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
)(Quote)
