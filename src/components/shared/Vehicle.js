import React from 'react';
import history from '../../history'
import QuoteItemCard from './QuoteItemCard'
import { withTranslation } from 'react-i18next';
import { ReactComponent as SampleIcon } from '../../images/sample.svg';
import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon } from '../../images/trash.svg'

class Vehicle extends React.Component {
  constructor(props) {
    super(props)
    this.editVehicle = this.editVehicle.bind(this)
    this.deleteVehicle = this.deleteVehicle.bind(this)
  }
  editVehicle() {
    const { vehicle } = this.props
    history.push(`/vehicles/${vehicle.id}/edit`)
  }

  deleteVehicle() {
    const { deleteVehicle, t, vehicle } = this.props
    let confirmed = window.confirm(t('quotes:fields.vehicle.deleteConfirm'))

    if (confirmed) {
      deleteVehicle(vehicle.id)
    }
  }

  render() {
    const { t, vehicle } = this.props
    const { year, manufacturer, model, trim, use_code } = vehicle

    const icon = <img src={vehicle.logo_url}/>
    const title = `${year} ${manufacturer} ${model} ${trim}`
    const body = t(`form.fields.use.useCode.${use_code.toLowerCase()}.label`)

    return (
      <QuoteItemCard icon={icon} title={title} body={body}>
        <div className='d-flex actions text-med-light'>
          <PencilIcon className="mr-3" onClick={this.editVehicle}/>
          <TrashIcon onClick={this.deleteVehicle}/>
        </div>
      </QuoteItemCard>
    )
  }
}

export default withTranslation(['vehicles'])(Vehicle)
