import React                          from 'react'
import { withTranslation }            from 'react-i18next';

import CustomCard          from '../../shared/CustomCard'
import { ReactComponent as PencilIcon } from '../../../images/pencil.svg'
import { ReactComponent as CheckIcon } from '../../../images/check-circle-fill.svg'

import history          from '../../../history'
import { vehicleTitle } from '../../../services/vehicle-display';

function VehicleReview({ t, vehicle }) {
  const { manufacturer, use_code } = vehicle
  const icon = <img src={vehicle.logo_url} alt={manufacturer}/>
  const title = vehicleTitle(vehicle)
  const body = t(`form.fields.use.useCode.${use_code.toLowerCase()}.label`)


  const editVehicle = id => history.push(`/bol/vehicles/${id}/edit`)

  const completedIcon = false ? <div className="text-success"><CheckIcon/></div> :
      <div className='d-flex actions'>
        <PencilIcon className="mr-3" onClick={() => editVehicle(vehicle.id)}/>
      </div>


  return (
    <CustomCard icon={icon} title={title} body={body}>
      { completedIcon }
    </CustomCard>
  )
}

export default withTranslation(['vehicles'])(VehicleReview)
