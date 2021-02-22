import React               from 'react';
import { useDispatch   }   from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link }            from 'react-router-dom';

import { deleteVehicle }  from '../../actions/vehicles'

import { vehicleTitle, vehicleInfoBody } from '../../services/vehicle-display'

import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon }  from '../../images/trash.svg'


function VehicleInfo({ vehicle, t, forceShowEditUi=true, fullInfo=false, isBolQuotesRates=false }) {
  const dispatch    = useDispatch()
  const { manufacturer, id, logo_url } = vehicle

  const onDeleteVehicle = () => {
    let confirmed = window.confirm(t('quotes:fields.vehicle.deleteConfirm'))

    if (confirmed) dispatch(deleteVehicle(id))
  }

  const title   = vehicleTitle(vehicle)
  const body    = vehicleInfoBody(t, vehicle, fullInfo)
  const editUrlPrefix = isBolQuotesRates ? '/bol' : ''

  return (
    <div className='d-flex align-items-center vehicle-rate-item__header'>
      <div className='mr-3 icon'>
        <img src={logo_url} alt={manufacturer}/>
      </div>
      <div className='d-flex flex-column flex-grow-1'>
        <div className='title'>{title}</div>
        <div>
          {body}
        </div>
      </div>

      { forceShowEditUi &&
        <div className="actions text-med-light d-flex justify-content-end">
          <Link
            className="text-med-light"
            to={{
              pathname: `${editUrlPrefix}/vehicles/${id}/edit`,
              state: { prevPath: "/rates" },
            }}
          >
            <PencilIcon className="mr-3" />
          </Link>
          { !isBolQuotesRates && <TrashIcon onClick={onDeleteVehicle} /> }
        </div>
      }
    </div>
  )
}

export default withTranslation(['vehicles'])(VehicleInfo)
