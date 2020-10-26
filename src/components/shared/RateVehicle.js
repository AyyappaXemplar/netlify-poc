import React from 'react';
import { withTranslation } from 'react-i18next';

import history from '../../history';

import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon }  from '../../images/trash.svg'
import { ReactComponent as SampleIcon } from '../../images/sample.svg';
import { ReactComponent as CheckIcon }  from '../../images/check-circle-fill.svg';
import QuoteCoverageStrength from './QuoteCoverageStrength';
import QuoteCoveragePricing  from './QuoteCoveragePricing';
import DashIcon      from './DashCircle';
import CustomNavLink from './CustomNavLink';

class RatedQuoteVehicle extends React.Component {
  constructor(props) {
    super(props)
    this.state = { package: 'LIABILITY' }
  }

  coverageValues(coverage) {
    return (
      coverage.limits.map(limit => {
        let rounded = Math.round(limit.amount)/100000;
        return `${rounded}K`
      }).join('/')
    )
  }

  vehicleCoverage(item) {
    let values = item.included ? this.coverageValues(item.coverage) : "N/A"
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

  coverageDisplay() {
    const { coverages } = this.props.vehicle
    const allCoverages = this.props.coverages.groupedByType.BETTER

    const displayedCoverages = coverages.map(item => ({coverage: item, included: true }))

    // insert coverages not included in the array
    allCoverages.forEach(item => {
      let included = coverages.find(cov => cov.type === item.type)

      if (!included) displayedCoverages.push({ coverage: item, included: false })
    })

    return displayedCoverages.map(item => this.vehicleCoverage(item))
  }

  render() {
    const { vehicle } = this.props
    const { manufacturer, model, year, trim, use_code,
            vehicle_premium, id } = vehicle
    const { updateVehicleCoverages } = this.props
    const icon = <SampleIcon/>
    const title = `${year} ${manufacturer} ${model} ${trim}`
    const coverageDisplay = this.coverageDisplay()
    const premium = Math.ceil(vehicle_premium / 100)

    // TODO: move these strings to constants
    // make changing active nav a controlled process
    const addBasicCoverage = () => this.setState({ package: 'LIABILITY' }, () => updateVehicleCoverages(id, 'LIABILITY'))
    const addFullCoverage =  () => this.setState({ package: 'GOOD' }, () => updateVehicleCoverages(id, 'GOOD'))
    const addComprehensiveCoverage = () => this.setState({ package: 'BETTER' }, () => updateVehicleCoverages(id, 'BETTER'))

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
              history.push(`/rates/vehicles/${vehicle.id}/edit`)
              }}/>
            <TrashIcon onClick={()=>{}}/>
          </div>
        </div>

        <CustomNavLink
          labels={["Basic", "Full", "Comprehensive"]}
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
              <QuoteCoverageStrength strength={this.state.package}/>
            </div>
            <QuoteCoveragePricing strength={this.state.package}/>
          </div>
        </div>

        { coverageDisplay }

      </div>
    )
  }
}

export default withTranslation(['vehicles'])(RatedQuoteVehicle)
