import React from 'react';
import { withTranslation } from 'react-i18next';
import DriverForm from '../forms/DriverForm';
import history from '../../history';
import { connect } from "react-redux"

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

    if (driver.policyholder) {
      window.HappyFoxChat.unsetVisitor(function(err) {
        if (err) {
          console.error('Failed to reset the visitor. Error:', err);
        } else {
          console.log('Visitor reset successful');
        }
      })
  
      window.HappyFoxChat.setVisitorInfo({
        name: `${driver.first_name} ${driver.last_name}`
      }, function (err, resp) {
        if (err) {
          console.error('Failed to set visitor details. Error:', err);
        } else {
          console.log('Added visitor details:', resp);
        }
      })
    }
  }

  getReturnPath() {
    let returnPath
    if (this.props.location.state?.prevPath === '/rates') {
      returnPath = '/rates'
    } else if (this.props.data.rates.length) {
      returnPath = '/quotes/review'
    } else {
      returnPath = '/quotes/drivers'
    }

    return returnPath
  }

  render() {
    if (!this.state.driver) return false

    const { t } = this.props

    return (
      <DriverForm
        handleSubmit={this.handleSubmit}
        title={t('edit.title')}
        data={this.props.data}
        driver={this.state.driver}
        returnPath={this.getReturnPath()}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    driversArr: state.data.quote.drivers
  }
}

export default connect(mapStateToProps)(withTranslation(['drivers'])(DriversEdit))

