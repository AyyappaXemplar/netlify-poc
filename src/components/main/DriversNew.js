import React from 'react';
import { withTranslation } from 'react-i18next';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import DriverForm from '../forms/DriverForm';
import history from '../../history';

class DriversNew extends React.Component {
  driver = { first_name: '', last_name: '', birthday: '', gender: false,
             marital_status: false, license_status: false, good_driver: false, good_student: false,
             defensive_driver: false, requires_sr22: false, policy_holder: false  }
  // driver = { first_name: 'Juan', last_name: 'Ortiz', birthday: '44', gender: 'male',
  //            marital_status: 'married', license_status: 'active', good_driver: true, good_student: false,
  //            defensive_driver: false, requires_sr22: false, policy_holder: true  }

  constructor(props) {
    super(props)
    this.createDriver = this.createDriver.bind(this)
  }

  componentDidMount() {
    const { setProgress } = this.props
    this.setPolicyHolder()
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
      history.push('/quotes/drivers')
    }
  }

  setPolicyHolder() {
    const { drivers } = this.props.data
    if (!drivers.length) this.driver.policy_holder = true
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
