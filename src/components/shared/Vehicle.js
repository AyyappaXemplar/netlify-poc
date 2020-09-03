import React from 'react';
import QuoteItemCard from './QuoteItemCard'
import { withTranslation } from 'react-i18next';
import { ReactComponent as SampleIcon } from '../../images/sample.svg';

class Vehicle extends React.Component {
  onDelete() {
    const { deleteVehicle, t, vehicle } = this.props
    let confirmed = window.confirm(t('vehiclesIndex:fields.vehicle.deleteConfirm'))

    if (confirmed) {
      debugger
      deleteVehicle(vehicle.id)
    }
  }

  render() {
    const { t, vehicle } = this.props
    const { year, manufacturer, model, trim, use_code } = vehicle

    const icon = <SampleIcon/>
    const title = `${year} ${manufacturer} ${model} ${trim}`
    const body = t(`vehiclesNew:fields.use.useCode.${use_code}.label`)
    const onDelete = this.onDelete.bind(this)

    return <QuoteItemCard icon={icon} title={title} body={body} onDelete={onDelete}/>
  }
}

export default withTranslation(['vehiclesIndex'])(Vehicle)
