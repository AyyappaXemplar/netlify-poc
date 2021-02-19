import React               from 'react';
import { useSelector }     from 'react-redux';
import { withTranslation } from 'react-i18next';

// import { formatMoney }          from '../../../services/payment-options'
import { getDeductibleOptions }                  from '../../../services/deductibles'
import { getCoverageValues, getCoverageDisplay } from '../../../services/coverages'
import { arrayUpdateItemById, arrayEquals }      from '../../../utilities/array-utilities'

import { ReactComponent as CheckIcon }  from '../../../images/check-circle-fill.svg';
import DashIcon     from '../../shared/DashCircle';
import VehicleInfo  from '../../shared/VehicleInfo';
import CustomSelect from '../../forms/CustomSelect';

const VehicleCoveragesForm = ({ vehicle, t, setVehicles }) => {
  const selectedRate           = useSelector(state => state.data.quote.selected_rate)
  const newDeductibleCoverages = getDeductibleOptions(selectedRate)

  function changeVehicleCoverage(values, coverage) {
    if (!values[0]) return
    setVehicles(prevVehicles => {
      const newVehicle = prevVehicles.find(v => v.id === vehicle.id)

      const coverages = vehicle.coverages.map(cov => {
        if (cov.type === coverage.type) {
          values[0].value.forEach((val, index) => cov.limits[index].amount = val)
        }
        return cov
      })
      newVehicle.coverages = coverages
      return arrayUpdateItemById(prevVehicles, newVehicle)
    })
  }

  function findAmount(options, coverage) {
    const amounts = vehicle.coverages
      .find(c => c.type === coverage.type).limits
      .map(l => l.amount)

    const option = options.find(option => arrayEquals(option.value, amounts) )
    return [option]
  }

  function customSelectForCoverage(coverage) {
    const options = coverage.deductibleOptions.map(option => {
      let label = option.map(item => item/100000)
      label = `$${label.join('/')}`
      return { label, value: option}
    })

    return <CustomSelect options={options} values={findAmount(options, coverage)} className='small'
              onChange={values => changeVehicleCoverage(values, coverage)}/>
  }

  function optionsForDeductible(coverage) {
    if (!coverage.included) return "N/A"

    const finalCoverage = newDeductibleCoverages.find(item => {
      return (item.type === coverage.type && item.package === vehicle.coverage_package_name)
    })

    if (!finalCoverage) {
      // return `${coverage.type}, ${vehicle.coverage_package_name} not found`
      return getCoverageValues(coverage)
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
