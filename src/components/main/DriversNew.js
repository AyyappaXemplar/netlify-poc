import React from 'react';
import { withTranslation } from 'react-i18next';
import DriverForm from '../forms/DriverForm';
import history from '../../history';

class DriversNew extends React.Component {
  constructor(props) {
    super(props)
    this.createDriver = this.createDriver.bind(this)
    const { address } = this.props.data.quote
    const { drivers } = this.props.data.quote
    // const driver = {
    //     first_name: '', last_name: '', birthday: '', gender: false,
    //     marital_status: false, license_status: false, good_driver: false, good_student: false,
    //     defensive_driver: false, requires_sr22: false, policy_holder: false, address
    //   }
    // }
    const driver = {
      first_name: 'Juan', last_name: 'Ortiz', birthday: '1990-09-13', gender: 'male',
      marital_status: 'married', license_status: 'active', good_driver: true, good_student: false,
      defensive_driver: false, requires_sr22: false, policy_holder: true,
      address: { zip_code: '60647', state: 'IL' }
    }

    if (!drivers.length) driver.policy_holder = true
    this.state = { driver }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUpdate = prevProps.state.creatingDriver
    const { creatingDriver } = this.props.state
    const requestFired = prevUpdate && !creatingDriver

    const prevDrivers = prevProps.data.quote.drivers.length
    const { drivers } = this.props.data.quote
    const driverAdded = prevDrivers < drivers.length

    if (requestFired & driverAdded) {
      history.push('/quotes/drivers')
    }
  }

  createDriver(event, driver) {
    event.preventDefault()
    this.props.createDriver(driver)
  }

  render() {
    const { t } = this.props
    const avoidCancel = this.props.data.quote.drivers.length === 0;

    return (
      <DriverForm handleSubmit={this.createDriver} title={t('new.title')} driver={this.state.driver} avoidCancel={avoidCancel} />
    );
  }
}

export default withTranslation(['drivers'])(DriversNew)
