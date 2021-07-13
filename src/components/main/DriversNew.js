import React from 'react';
import { withTranslation } from 'react-i18next';
import DriverForm from '../forms/DriverForm';
import history  from '../../history';
import mixpanel from '../../config/mixpanel';
import { getTimestamp } from '../../services/timestamps'

class DriversNew extends React.Component {
  constructor(props) {
    super(props)
    this.createDriver = this.createDriver.bind(this)
    const { address } = this.props.data.quote
    const { drivers } = this.props.data.quote
    const driver = {
      first_name: '', last_name: '', birthday: '', gender: false,
      marital_status: false, license_status: false, good_driver: false, good_student: false,
      defensive_driver: false, requires_sr22: false, policy_holder: false, address,
      included_in_policy: true
    }
    // const driver = {
    //   first_name: 'Juan', last_name: 'Ortiz', birthday: '1990-09-13', gender: 'male',
    //   marital_status: 'married', license_status: 'active', good_driver: true, good_student: false,
    //   defensive_driver: false, requires_sr22: false, policy_holder: true,
    //   address: { zip_code: '60647', state: 'IL' }
    // }

    if (!drivers.length) driver.policy_holder = true
    this.state = { driver }
  }

  componentDidMount() {
    this.props.data.quote.drivers.length && this.props.data.quote.drivers.length < 1 ? mixpanel.track("Pageview", {
      "Page Title": "Driver Add (1)",
      "Section": "Quick Quote"
    }) : mixpanel.track("Pageview", {
      "Page Title": `Driver Add (${this.props.data.quote.drivers.length + 1})`,
      "Section": "Quick Quote"
    })
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

    mixpanel.register({
      "age": driver.age,
      "name": `${driver.first_name} ${driver.last_name}`,
      "gender": `${driver.gender}`
    });
    mixpanel.track('Driver added')
    this.props.createDriver({ ...driver, license_issued_at: getTimestamp(driver.birthday) })
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
