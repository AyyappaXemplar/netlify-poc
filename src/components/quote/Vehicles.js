import React               from 'react';
import { withTranslation } from 'react-i18next';

import history from '../../history';

import AddButton from '../shared/AddButton'
import FormAlert from '../shared/FormAlert'
import Vehicle  from '../../containers/Vehicle'

class QuoteVehicles extends React.Component {
  MAX_VEHICLES = 6

  addVehicle() {
    const { vehicles } = this.props.data.quote
    const { setAlert, t } = this.props

    if (vehicles.length >= this.MAX_VEHICLES) {
      setAlert({
        variant: 'danger',
        text: t('fields.vehicle.error.maxReached', { maxVehicleNumber: this.MAX_VEHICLES })
      })
    } else {
      history.push('/vehicles/new')
    }
  }

  alert() {
    const { showWarnings, t } = this.props
    return showWarnings ? <FormAlert text={t('fields.vehicle.error.presence')}/> : false
  }

  render() {
    const { t, disabled } = this.props
    const { vehicles } = this.props.data.quote
    const addVehicleDisabled = vehicles.length >= this.MAX_VEHICLES
    const vehiclesComponent = vehicles.map((vehicle, index) => <Vehicle key={index} vehicle={vehicle}/>)
    const alert = this.alert()

    return(
      <>
        {
          !!vehicles.length ?
          <>
            <label>{t('fields.vehicle.title')}</label>
            <div>
              { vehiclesComponent }
            </div>
          </>

         : alert
        }


        { !disabled &&
          <AddButton
            onClick={this.addVehicle.bind(this)}
            disabled={addVehicleDisabled}
            text={t('fields.vehicle.addButton')}
          />
        }
      </>
    )
  }
}

export default withTranslation(['quotes'])(QuoteVehicles)
