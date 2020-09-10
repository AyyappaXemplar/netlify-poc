import React from 'react';
import { withTranslation } from 'react-i18next';
import Vehicle from '../../containers/Vehicle'
import history from '../../history';
import AddButton from './AddButton'

class QuoteVehicles extends React.Component {
  MAX_VEHICLES = 6

  addVehicle() {
    const { vehicles } = this.props.data
    const { setAlert, t } = this.props

    if (vehicles.length >= this.MAX_VEHICLES) {
      setAlert({
        variant: 'danger',
        text: t('fields.vehicle.error', { maxVehicleNumber: this.MAX_VEHICLES })
      })
    } else {
      history.push('/vehicles/new')
    }
  }

  render() {
    const { t, disabled } = this.props
    const { vehicles } = this.props.data
    const addVehicleDisabled = vehicles.length >= this.MAX_VEHICLES
    const vehiclesComponent = vehicles.map((vehicle, index) => <Vehicle key={index} vehicle={vehicle}/>)

    return(
      <>
        { !!vehiclesComponent.length ?
          <>
            <label>{t('fields.vehicle.title')}</label>
            <div>
              { vehiclesComponent }
            </div>
          </>
         : false }


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
