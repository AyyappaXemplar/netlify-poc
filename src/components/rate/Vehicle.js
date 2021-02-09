import React               from 'react';
import { useDispatch   }   from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link }            from 'react-router-dom';

import { deleteVehicle }  from '../../actions/vehicles'

import { formatMoney }    from '../../services/payment-options'
import { vehicleTitle }    from '../../services/vehicle-display'

import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon }  from '../../images/trash.svg'

import CoverageStrength        from '../shared/CoverageStrength';
import CoveragePricing         from '../shared/CoveragePricing';
import VehicleCoverages        from './VehicleCoverages';
import VehicleCoverageSelector from './VehicleCoverageSelector';

function RatedQuoteVehicle({ vehicle, t, hideCoveragesSelector }) {
  const dispatch    = useDispatch()

  const onDeleteVehicle = () => {
    let confirmed = window.confirm(t('quotes:fields.vehicle.deleteConfirm'))

    if (confirmed) dispatch(deleteVehicle(id))
  }

  const { manufacturer, use_code,
          vehicle_premium, id, logo_url } = vehicle
  const title   = vehicleTitle(vehicle)
  const premium = formatMoney(vehicle_premium / 100)
  const useCode = t(`form.fields.use.useCode.${use_code.toLowerCase()}.label`)

  return (
    <div className='w-100 h-100 rate-item-card vehicle-rate-item bg-white rounded'>
      <div className='d-flex align-items-center vehicle-rate-item__header'>
        <div className='mr-3 icon'>
          <img src={logo_url} alt={manufacturer}/>
        </div>
        <div className='d-flex flex-column flex-grow-1'>
          <div className='title'>{title}</div>
          <div>{useCode}</div>
        </div>
        <div className='actions text-med-light'>
          <Link className='text-med-light' to={{ pathname:`/rates/vehicles/${id}/edit`, state: { prevPath: '/rates' }}}>
            <PencilIcon className="mr-3"/>
          </Link>
          <TrashIcon onClick={onDeleteVehicle}/>
        </div>
      </div>

      {!hideCoveragesSelector ? <VehicleCoverageSelector vehicle={vehicle}/> : ""}

      <div className="d-flex flex-sm-row flex-column mb-4">
        <div className="w-sm-60 d-flex price-container mb-4 mb-sm-0">
          <p className="price-container__price mb-0">
            <sup className="price-container__dollar">$</sup>
            {premium}
          </p>
          <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> term</span>
        </div>
        <div className="w-sm-40">
          <div className="mb-3">
            <CoverageStrength strength={vehicle.coverage_package_name}/>
          </div>
          <CoveragePricing strength={vehicle.coverage_package_name}/>
        </div>
      </div>

      <VehicleCoverages vehicle={vehicle}/>

    </div>
  )
}

export default withTranslation(['vehicles'])(RatedQuoteVehicle)
