import React from 'react';
import { withTranslation } from 'react-i18next';
import Driver from '../../containers/Driver'
import history from '../../history';
import AddButton from './AddButton'

class QuoteDrivers extends React.Component {
  MAX_DRIVERS = 6

  addDriver() {
    const { drivers } = this.props.data
    const { setAlert, t } = this.props

    if (drivers.length >= this.MAX_DRIVERS) {
      setAlert({
        variant: 'danger',
        text: t('fields.driver.error', { maxDriverNumber: this.MAX_DRIVERS })
      })
    } else {
      history.push('/drivers/new')
    }
  }

  render() {
    const { t, disabled } = this.props
    const { drivers } = this.props.data
    const addDriverDisabled = drivers.length >= this.MAX_DRIVERS
    const driverComponents = drivers.map((driver, index) => <Driver key={index} driver={driver}/>)

    return(
      <>
        { !!driverComponents.length ?
          <>
            <label>{t('fields.drivers.title')}</label>
            <div>
              { driverComponents }
            </div>
          </>
          : false }

        { !disabled &&
          <AddButton
            onClick={this.addDriver.bind(this)}
            disabled={addDriverDisabled}
            text={t('fields.drivers.addButton')}
          />
        }
      </>
    )
  }
}

export default withTranslation(['quotes'])(QuoteDrivers)
