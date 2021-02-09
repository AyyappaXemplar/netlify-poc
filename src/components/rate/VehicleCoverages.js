import React               from 'react';
import { useSelector }     from 'react-redux';
import { withTranslation } from 'react-i18next';

import { getCoverageValues } from '../../services/coverages'

import { ReactComponent as CheckIcon }  from '../../images/check-circle-fill.svg';

import DashIcon                from '../shared/DashCircle';

function VehicleCoverages({ vehicle, t }) {
  const coverages   = useSelector(state => state.data.coverages)

  const { coverages: vehicleCoverages } = vehicle

  const allCoverages = coverages.groupedByType.BETTER
  const displayedCoverages = vehicleCoverages.map(item => ({coverage: item, included: true }))

  // insert coverages not included in the array
  allCoverages.forEach(item => {
    let included = vehicleCoverages.find(cov => cov.type === item.type)

    if (!included) displayedCoverages.push({ coverage: item, included: false })
  })

  function coverageItems() {
    return displayedCoverages.map(item => (
      <div key={item.coverage.type} className="rate-item-card__attribute d-flex justify-content-between">
        <div className='title d-flex align-items-center'>
          { item.included ?
            <CheckIcon className='text-success flex-none' width="18px" height="18px" /> :
            <DashIcon circleFill="var(--primary)" rectFill="white" classes="flex-none" />
          }

          {item.coverage.description}
        </div>
        <div className='value text-capitalize'>
          { item.included ?
            getCoverageValues(item.coverage) :
            "N/A"}
        </div>
      </div>
    ))
  }

  // TNC coverages like ridesharing and individual delivery
  // If they are included, we'll add coverage checkmarks
  function tncCoverages() {
    const appliedTncCoverages = [
      { title: "Ridesharing", applied: vehicle.tnc },
      { title: "Individual Delivery", applied: vehicle.individual_delivery }
    ]

    return appliedTncCoverages.filter(coverage => coverage.applied).map((coverage, index) => (
      <div key={`${vehicle.id}-tnc-coverage-${index}`} className="rate-item-card__attribute d-flex justify-content-between">
        <div className='title d-flex align-items-center'>
          <CheckIcon className='text-success flex-none' width="18px" height="18px" />

          {coverage.title}
        </div>
        <div className='value text-capitalize'>
          Incl.
        </div>
      </div>
    ))
  }

  return(
    <>
      {coverageItems()}
      {tncCoverages()}
    </>
  )
}

export default withTranslation(['vehicles'])(VehicleCoverages)
