import React                          from 'react';
import { useSelector, useDispatch   } from 'react-redux';
import { withTranslation }            from 'react-i18next';

import { deleteVehicle }  from '../../actions/vehicles'
import history            from '../../history';

import { formatMoney }    from '../../services/payment-options'

import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon }  from '../../images/trash.svg'
import { ReactComponent as CheckIcon }  from '../../images/check-circle-fill.svg';

import CoverageStrength        from '../shared/CoverageStrength';
import CoveragePricing         from '../shared/CoveragePricing';
import DashIcon                from '../shared/DashCircle';
import VehicleCoverageSelector from './VehicleCoverageSelector';

function RatedQuoteVehicle({ vehicle, t }) {
  const dispatch    = useDispatch()
  const coverages   = useSelector(state => state.data.coverages)

  const coverageValues = coverage => {
    return (
      coverage.limits.map(limit => {
        // Divide by 100 to go from cents to dollars
        let rounded = Math.round(limit.amount)/100;

        // If it's smaller than 1000, we'll want to
        // display as a number like $500 or $1,000.
        if (rounded <= 1000) {
          return `$${formatMoney(rounded)}`
        } else {
          rounded = Math.round(limit.amount)/100000;
          return `$${rounded}K`
        }
      }).join(' / ')
    )
  }

  const vehicleCoverage = item => {
    let values = item.included ? coverageValues(item.coverage) : "N/A"
    let icon = item.included ? <CheckIcon className='text-success'/> :
                               <DashIcon circleFill="var(--primary)" rectFill="white"/>

    return (
      <div key={item.coverage.type} className="rate-item-card__attribute d-flex justify-content-between">
        <div className='title d-flex align-items-center'>
          {icon}
          {item.coverage.description}
        </div>
        <div className='value text-capitalize'>{values}</div>
      </div>
    )
  }

  const onDeleteVehicle = () => {
    let confirmed = window.confirm(t('quotes:fields.vehicle.deleteConfirm'))

    if (confirmed) dispatch(deleteVehicle(id))
  }

  const coverageDisplay = () => {
    const { coverages: vehicleCoverages } = vehicle

    const allCoverages = coverages.groupedByType.BETTER
    const displayedCoverages = vehicleCoverages.map(item => ({coverage: item, included: true }))

    // insert coverages not included in the array
    allCoverages.forEach(item => {
      let included = vehicleCoverages.find(cov => cov.type === item.type)

      if (!included) displayedCoverages.push({ coverage: item, included: false })
    })

    return displayedCoverages.map(item => vehicleCoverage(item))
  }

  const { manufacturer, model, year, use_code,
          vehicle_premium, id, logo_url } = vehicle
  const title   = `${year} ${manufacturer} ${model}`
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
          <PencilIcon className="mr-3" onClick={() => {
            history.push(`/rates/vehicles/${id}/edit`)
            }}/>
          <TrashIcon onClick={onDeleteVehicle}/>
        </div>
      </div>

      <VehicleCoverageSelector vehicle={vehicle}/>

      <div className="d-flex align-items-end mb-4">
        <div className="w-60 d-flex price-container">
          <p className="price-container__price mb-0">
            <sup className="price-container__dollar">$</sup>
            {premium}
          </p>
          <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> term</span>
        </div>
        <div className="w-40">
          <div className="mb-3">
            <CoverageStrength strength={vehicle.coverage_package_name}/>
          </div>
          <CoveragePricing strength={vehicle.coverage_package_name}/>
        </div>
      </div>

      { coverageDisplay() }

    </div>
  )
}

export default withTranslation(['vehicles'])(RatedQuoteVehicle)
