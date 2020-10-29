import React               from 'react';
import { withTranslation } from 'react-i18next';

import history from '../../history'

import CustomCard                    from '../shared/CustomCard'
import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon }  from '../../images/trash.svg'

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

    const icon = <img src={vehicle.logo_url} alt={manufacturer}/>
    const title = `${year} ${manufacturer} ${model} ${trim}`
    const body = t(`form.fields.use.useCode.${use_code.toLowerCase()}.label`)

    return (
      <CustomCard icon={icon} title={title} body={body}>
        <div className='d-flex actions'>
          <PencilIcon className="mr-3" onClick={this.editVehicle}/>
          <TrashIcon onClick={this.deleteVehicle}/>
        </div>
      </CustomCard>
    )
  }
}

export default withTranslation(['vehicles'])(Vehicle)
