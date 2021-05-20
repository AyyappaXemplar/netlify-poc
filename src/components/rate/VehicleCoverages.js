import React               from 'react';
import { withTranslation } from 'react-i18next';

import { getCoverageValues, policyCoverageTypes, getCoverageDisplay } from '../../services/coverages'

import { ReactComponent as CheckIcon }  from '../../images/check-circle-fill.svg';

import DashIcon                from '../shared/DashCircle';

function VehicleCoverages({ vehicle, t, isBolQuotesRates, excludePolicyCoverages=false }) {
  const coveragePackageDisplay = {
    LIABILITY: t("vehiclesCoverages.liability"),
    GOOD: t("vehiclesCoverages.good"),
    BETTER: t("vehiclesCoverages.better")
  }
  let displayedCoverages = getCoverageDisplay(vehicle)

  if (excludePolicyCoverages) {
    displayedCoverages = displayedCoverages.filter(coverage => !policyCoverageTypes.includes(coverage.type))
  }

  const  coverageItems = displayedCoverages.map(item => {
    let value = item.included ? getCoverageValues(item) : "N/A"

    return <CoverageDisplay key={item.type} description={item.description}
             included={item.included} value={value}/>
  })

  // TNC coverages like ridesharing and individual delivery
  // If they are included, we'll add coverage checkmarks
  const appliedTncCoverages = [
    { title: "Ridesharing", applied: vehicle.tnc },
    { title: "Individual Delivery", applied: vehicle.individual_delivery }
  ]
  const tncCoverages = appliedTncCoverages.filter(coverage => coverage.applied).map((coverage, index) => (
    <CoverageDisplay key={`${vehicle.id}-tnc-coverage-${index}`} description={coverage.title}
             included={true} value='Incl.'/>
  ))
 
  const coverageLevel = coveragePackageDisplay[vehicle.coverage_package_name]

  return(
    <>
      { isBolQuotesRates && <div className='mb-3 d-flex text-horizontal-line'>{coverageLevel} {t("vehiclesCoverages.coverage")}</div> }
      {coverageItems}
      {tncCoverages}
    </>
  )
}

function CoverageDisplay({included, description, value}) {
  return (
    <div className={"rate-item-card__attribute d-flex justify-content-between"}>
      <div className='title d-flex align-items-center'>
        { included ?
          <CheckIcon className='text-success flex-none' width="18px" height="18px" /> :
          <DashIcon circleFill="var(--primary)" rectFill="white" classes="flex-none" />
        }

        {description}
      </div>
      <div className='value text-capitalize'>
        { value }
      </div>
    </div>
  )
}

export default withTranslation(['vehicles'])(VehicleCoverages)
