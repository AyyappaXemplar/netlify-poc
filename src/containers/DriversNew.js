import { connect } from 'react-redux'
import DriversNew from '../components/main/DriversNew.js'
import { setProgress }  from '../actions/state.js'

const mapStateToProps = (state, ownProps) => state
const mapDispatchToProps = dispatch => ({
  setProgress: progress => dispatch(setProgress(progress)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriversNew)
