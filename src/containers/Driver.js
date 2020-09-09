import { connect } from 'react-redux'
import Driver from '../components/shared/Driver.js'
import { deleteDriver }  from '../actions/drivers.js'

const mapDispatchToProps = dispatch => ({
  deleteDriver: (driverId) => dispatch(deleteDriver(driverId))
})

export default connect(
  null,
  mapDispatchToProps
)(Driver)
