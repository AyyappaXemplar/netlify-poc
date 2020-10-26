import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch   }         from 'react-redux';
import { withTranslation }            from 'react-i18next';


import { updateVehicleCoverages,
         deleteVehicle }  from '../../actions/vehicles'
import history            from '../../history';

import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon }  from '../../images/trash.svg'
import { ReactComponent as CheckIcon }  from '../../images/check-circle-fill.svg';

import QuoteCoverageStrength   from './QuoteCoverageStrength';
import QuoteCoveragePricing    from './QuoteCoveragePricing';
import DashIcon                from './DashCircle';
import VehicleCoverageSelector from './VehicleCoverageSelector';

function RatedQuoteVehicle({ vehicle }) {
  const dispatch = useDispatch()
  const [coveragePackage, setCoveragePackage] = useState(vehicle.coverage_package_name)
  const coverages       = useSelector(state => state.data.coverages)
  const updatingVehicle = useSelector(state => state.state.updatingVehicle)
  const ratingQuote     = useSelector(state => state.state.ratingQuote)

  const coverageValues = coverage => {
    return (
      coverage.limits.map(limit => {
        let rounded = Math.round(limit.amount)/100000;
        return `${rounded}K`
      }).join('/')
    )
  }

  const vehicleCoverage = item => {
    let values = item.included ? coverageValues(item.coverage) : "N/A"
    let icon = item.included ? <CheckIcon className='text-success'/> :
                               <DashIcon circleFill="var(--primary)" rectFill="white"/>

    return (
      <div key={item.coverage.type} className="rate-item-card__attribute py-2 d-flex">
        <div className='w-75 title'>
          <div className='vehicle-coverage__icon mr-3 d-inline-block'>
            {icon}
          </div>
          {item.coverage.description}
        </div>
        <div className='w-25 text-capitalize'>{values}</div>
      </div>
    )
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

  const { manufacturer, model, year, trim, use_code,
          vehicle_premium, id, logo_url } = vehicle
  const icon = <img src={logo_url} alt={manufacturer}/>
  const title = `${year} ${manufacturer} ${model} ${trim}`
  const premium = Math.ceil(vehicle_premium / 100)

  // TODO: move these strings to constants
  // make changing active nav a controlled process
  const addBasicCoverage = () => setCoveragePackage('LIABILITY')
  const addFullCoverage =  () => setCoveragePackage('GOOD')
  const addComprehensiveCoverage = () => setCoveragePackage('BETTER')

  useEffect(() => {
    if (coveragePackage !== vehicle.coverage_package_name) {
      dispatch(updateVehicleCoverages(vehicle.id, coveragePackage))
    }
  }, [dispatch, vehicle, coveragePackage])

  return (
    <div className='h-100 rate-item-card bg-white rounded p-4'>

      <div className='d-flex align-items-center mb-5'>
        <div className='mr-3 icon'>{icon}</div>
        <div className='d-flex flex-column flex-grow-1'>
          <div className='title'>{title}</div>
          <div>{use_code}</div>
        </div>
        <div className='actions text-med-light'>
          <PencilIcon className="mr-3" onClick={() => {
            history.push(`/rates/vehicles/${id}/edit`)
            }}/>
          <TrashIcon onClick={()=>{ dispatch(deleteVehicle(id))}}/>
        </div>
      </div>

      <VehicleCoverageSelector
        activeKey={coveragePackage}
        coveragesReady={!ratingQuote && !updatingVehicle}
        actions={[addBasicCoverage, addFullCoverage, addComprehensiveCoverage]}
      />

      <div className="d-flex align-items-end mb-5">
        <div className="w-50 d-flex price-container">
          <p className="price-container__price mb-0">
            <sup className="price-container__dollar">$</sup>
            {premium}
          </p>
          <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> month</span>
        </div>
        <div className="w-50">
          <div className="mb-3">
            <QuoteCoverageStrength strength={coveragePackage}/>
          </div>
          <QuoteCoveragePricing strength={coveragePackage}/>
        </div>
      </div>

      { coverageDisplay() }

    </div>
  )
}

export default withTranslation(['vehicles'])(RatedQuoteVehicle)
