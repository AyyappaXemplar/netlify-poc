import React               from 'react';
import { useSelector }     from 'react-redux';
import { withTranslation } from 'react-i18next';



// import { formatMoney }          from '../../../services/payment-options'
import { getDeductibleOptions }                  from '../../../services/deductibles'
import { getCoverageValues, getCoverageDisplay } from '../../../services/coverages'

import { ReactComponent as CheckIcon }  from '../../../images/check-circle-fill.svg';
import DashIcon     from '../../shared/DashCircle';
import VehicleInfo  from '../../shared/VehicleInfo';
import CustomSelect from '../../forms/CustomSelect';

function VehicleCoveragesForm({ vehicle, t }) {
  const selectedRate           = useSelector(state => state.data.quote.selected_rate)
  const newDeductibleCoverages = getDeductibleOptions(selectedRate)

  function changeVehicleCoverage(values, coverage) {
    if (!values[0]) return
    console.log(values[0].value, coverage.type, vehicle.coverage_package_name)
  }

  function customSelectForCoverage(coverage) {

    const options = coverage.deductibleOptions.map(option => {
      let label = option.map(item => item/100000)
      label = `$${label.join('/')}`
      return { label, value: option}
    })
    return <CustomSelect options={options} values={[]} className='small'
              onChange={values => changeVehicleCoverage(values, coverage)}/>
  }

  function optionsForDeductible(coverage) {
    if (!coverage.included) return "N/A"

    const finalCoverage = newDeductibleCoverages.find(item => {
      return (item.type === coverage.type && item.package === vehicle.coverage_package_name)
    })

    if (!finalCoverage) {
      return `${coverage.type}, ${vehicle.coverage_package_name} not found`
    }

    if (!finalCoverage.hasOptions) {
      return getCoverageValues(finalCoverage)
    } else {
      return customSelectForCoverage(finalCoverage)
    }
  }

  const displayedCoverages = getCoverageDisplay(vehicle)

  return (
    <div className='w-100 h-100 rate-item-card vehicle-rate-item bg-white rounded'>
      <VehicleInfo vehicle={vehicle} fullInfo={true} forceShowEditUi={false}/>

      { displayedCoverages.map(coverage =>
        <div key={coverage.type} className={"rate-item-card__attribute d-flex"}>
          <div className='title d-flex align-items-center w-50'>
            { coverage.included ?
              <CheckIcon className='text-success flex-none' width="18px" height="18px" /> :
              <DashIcon circleFill="var(--primary)" rectFill="white" classes="flex-none" />
            }

            {coverage.description}
          </div>
          <div className='value text-capitalize w-50'>
            { optionsForDeductible(coverage) }
          </div>
        </div>

      )}
    </div>
  )
}

export default withTranslation(['vehicles'])(VehicleCoveragesForm)
