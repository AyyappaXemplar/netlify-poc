import { connect } from 'react-redux'
import StartZip from '../components/main/StartZip'
import { verifyZip } from '../actions/data'
import { setAlert } from '../actions/state'

const mapStateToProps = (state, ownProps) => state

const mapDispatchToProps = dispatch => ({
  verifyZip: zip => dispatch(verifyZip(zip)),
  setAlert: alert => dispatch(setAlert(alert)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartZip)
