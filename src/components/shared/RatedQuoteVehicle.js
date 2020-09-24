import React from 'react';
// import history from '../../history'
import { withTranslation } from 'react-i18next';
import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon } from '../../images/trash.svg'
import { ReactComponent as SampleIcon } from '../../images/sample.svg';
import { ReactComponent as CheckIcon } from '../../images/check-circle-fill.svg';
import QuoteCoverageStrength from './QuoteCoverageStrength';

class RatedQuoteVehicle extends React.Component {
  // constructor(props) {
    // super(props)
  // }

  coverageDisplay() {
    const { coverages } = this.props.vehicle
    return coverages.map((coverage, index) => {

      let limits = coverage.limits.map(limit => {
        let rounded = Math.round(limit.amount * 10)/10000;
        return `${rounded}K`
      }).join('/')

      return (
        <div key={index} className="rated-quote-item-card__attribute py-2 d-flex">
          <div className='w-75 title'>
            <div className='vehicle-coverage__icon text-success mr-3 d-inline-block'>
              <CheckIcon/>
            </div>
            {coverage.description}
          </div>
          <div className='w-25 text-capitalize'>{limits}</div>
        </div>
      )
    })
  }

  render() {
    const { manufacturer, model, year, trim, use_code } = this.props.vehicle
    const icon = <SampleIcon/>
    const title = `${year} ${manufacturer} ${model} ${trim}`
    const coverageDisplay = this.coverageDisplay()

    return (
      <div className='h-100 rated-quote-item-card bg-white rounded p-4'>

        <div className='d-flex align-items-center mb-5'>
          <div className='mr-3 icon'>{icon}</div>
          <div className='d-flex flex-column flex-grow-1'>
            <div className='title'>{title}</div>
            <div>{use_code}</div>
          </div>
          <div className='actions text-med-light'>
            <PencilIcon className="mr-3"/>
            <TrashIcon onClick={()=>{}}/>
          </div>
        </div>

        <div className="d-flex align-items-end mb-5">
          <div className="w-50 d-flex price-container">
            <p className="price-container__price mb-0">
              <sup className="price-container__dollar">$</sup>
              23
            </p>
            <span className="price-container__text align-self-end text-med-dark ml-1">per<br/> month</span>
          </div>
          <div className="w-50">
            <QuoteCoverageStrength strength={1}/>
            <div>$$$<span> Low Price</span></div>
          </div>
        </div>

        { coverageDisplay }
      </div>
    )
  }
}

export default withTranslation(['vehicles'])(RatedQuoteVehicle)
