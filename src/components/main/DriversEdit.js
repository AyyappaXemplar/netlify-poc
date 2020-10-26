import React from 'react';
import { withTranslation } from 'react-i18next';
import DriverForm from '../forms/DriverForm';
import history from '../../history';

class DriversEdit extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { driver: false }
  }

  componentDidMount() {
    this.findDriver()
  }

  findDriver() {
    const driverId = this.props.match.params.driverId
    const driver = this.props.data.quote.drivers.find(driver => driver.id === driverId)
    this.setState({ driver })
    // this.setState({ driver: { use_code: 'farming', year: '2020', manufacturer: 'Acura', model: 'Acura TLX', trim: 'veh_12345' } })
  }

  componentDidUpdate(prevProps, prevState) {
    const prevUpdate = prevProps.state.updatingDriver
    const { updatingDriver } = this.props.state
    const requestFired = prevUpdate && !updatingDriver

    if (requestFired) {
      const successUrl = this.props.match.path === '/drivers/:driverId/edit' ? '/quotes/drivers' : '/quotes/review'
      history.push(successUrl)
    }
  }

  handleSubmit(event, driver) {
    event.preventDefault()
    const { updateDriver } = this.props
    updateDriver(driver.id, driver)
  }

  render() {
    if (!this.state.driver) return false

    const { t } = this.props

    return (
      <DriverForm handleSubmit={this.handleSubmit} title={t('edit.title')} driver={this.state.driver}/>
    );
  }
}

export default withTranslation(['drivers'])(DriversEdit)

