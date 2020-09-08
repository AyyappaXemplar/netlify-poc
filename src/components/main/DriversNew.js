import React from 'react';
import { withTranslation } from 'react-i18next';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import DriverForm from '../forms/DriverForm';
import history from '../../history';

class DriversNew extends React.Component {
  driver = { first_name: false, last_name: false, birthday: false, gender: false,
             marital_status: false, licenseStatus: false, good_driver: false, good_student: false,
             defensive_driver: false, requires_sr22: false }

  constructor(props) {
    super(props)
    this.createDriver = this.createDriver.bind(this)
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.DRIVERS)
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUpdate = prevProps.state.creatingDriver
    const { creatingDriver } = this.props.state
    const requestFired = prevUpdate && !creatingDriver

    const prevDrivers = prevProps.data.drivers.length
    const drivers = this.props.data.drivers.length
    const driverAdded = prevDrivers < drivers

    if (requestFired & driverAdded) {
      history.push('/quote')
    }
  }

  createDriver(event, driver) {
    event.preventDefault()
    this.props.createDriver(driver)
  }

  render() {
    const { t } = this.props
    return (
      <DriverForm handleSubmit={this.createDriver} title={t('new.title')} driver={this.driver}/>
    );
  }
}

export default withTranslation(['drivers'])(DriversNew)
