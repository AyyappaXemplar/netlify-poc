import React                          from 'react'
import { withTranslation }            from 'react-i18next';

import CustomCard          from '../../shared/CustomCard'
import { ReactComponent as PencilIcon } from '../../../images/pencil.svg'
import { ReactComponent as CheckIcon } from '../../../images/check-circle-fill.svg'
import { ReactComponent as AlertIcon } from '../../../images/alert-fill.svg'

import history          from '../../../history'
import validateVehicle  from '../../../validators/bind-online/VehicleForm'
import { vehicleTitle, vehicleInfoBody } from '../../../services/vehicle-display';

function VehicleReview({ t, vehicle }) {
  const { manufacturer } = vehicle
  const icon = <img src={vehicle.logo_url} alt={manufacturer}/>
  const title = vehicleTitle(vehicle)
  const body = vehicleInfoBody(t, vehicle, true)


  const editVehicle = id => history.push(`/bol/vehicles/${id}/edit`)

  const validationErrors = validateVehicle(vehicle)
  console.log(validationErrors)
  const completedIcon = validationErrors ?  <div className="text-warning mr-3"><AlertIcon/></div> :
                                            <div className="text-success mr-3"><CheckIcon/></div>



  return (
    <CustomCard icon={icon} title={title} body={body}>
      { completedIcon }
      <div className="d-flex actions">
        <PencilIcon className="mr-3" onClick={() => editVehicle(vehicle.id)}/>
      </div>
    </CustomCard>
  )
}

export default withTranslation(['vehicles'])(VehicleReview)
