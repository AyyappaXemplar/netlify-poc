import React from 'react';
import { withTranslation } from 'react-i18next';
import Driver from '../../containers/Driver'
import history from '../../history';
import AddButton from './AddButton'
import FormAlert from './FormAlert'

class QuoteDrivers extends React.Component {
  MAX_DRIVERS = 6

  addDriver() {
    const { drivers } = this.props.data.quote
    const { setAlert, t } = this.props

    if (drivers.length >= this.MAX_DRIVERS) {
      setAlert({
        variant: 'danger',
        text: t('fields.drivers.error.maxReached', { maxDriverNumber: this.MAX_DRIVERS })
      })
    } else {
      history.push('/drivers/new')
    }
  }

  alert() {
    const { showWarnings, t } = this.props
    return showWarnings ? <FormAlert text={t('fields.drivers.error.presence')}/> : false
  }

  render() {
    const { t, disabled } = this.props
    const { drivers } = this.props.data.quote
    const addDriverDisabled = drivers.length >= this.MAX_DRIVERS
    const driverComponents = drivers.map((driver, index) => <Driver key={index} driver={driver}/>)
    const alert = this.alert()

    return(
      <>
        {
          !!driverComponents.length ?
            <>
              <label>{t('fields.drivers.title')}</label>
              <div>
                { driverComponents }
              </div>
            </>
          : alert
        }

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
