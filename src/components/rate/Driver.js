import React               from 'react';
import { useDispatch }     from 'react-redux'
import { withTranslation } from 'react-i18next';
import { Link }            from 'react-router-dom';

import './Driver.scss'

import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon }  from '../../images/trash.svg'
import { ReactComponent as CheckIcon }  from '../../images/check-circle-fill.svg';

import getDriverIcon      from '../../services/driver-icon'
import { dateToAge }      from '../../services/driver-age'
import { deleteDriver }   from '../../actions/drivers'

function RatedQuoteDriver({ driver, t, isBolQuotesRates=false }) {
  const dispatch = useDispatch()

  function driverIcon() {
    const Icon = getDriverIcon(driver)
    return <Icon/>
  }

  function onDeleteDriver() {
    let confirmed = window.confirm(t('fields.drivers.deleteConfirm'))

    if (confirmed) {
      dispatch(deleteDriver(driver.id))
    }
  }

  const discounts = [
    { title: "Good Driver Discount", applied: driver.good_driver},
    { title: "Good Student Discount", applied: driver.good_student},
    { title: "Completed a defensive driver course", applied: driver.defensive_driver},
    { title: "Requires SR-22", applied: driver.requires_sr22}
  ].filter(discount => discount.applied)
   .map((discount, index) => (
      <div key={`${driver.id}-discount-${index}`} className="discount d-flex align-items-center mb-3">
        <div className="text-success mr-3" style={{width: '1.5rem'}}>
          <CheckIcon/>
        </div>
        <div>
          {discount.title}
        </div>
      </div>
    ))

  const { first_name, last_name, birthday } = driver

  const icon = driverIcon()
  const name = `${first_name} ${last_name}`
  const age = `${dateToAge(birthday)} years old`

  const displayedDriverProperties = [
    {title: "Gender", value: driver.gender},
    {title: "Age", value: age},
    {title: "Marital Status", value: driver.marital_status},
    {title: "License status", value: driver.license_status}
  ]

  const additionalDriverProperties = [
    { title: "Policy Relationship", value: driver.policy_holder_relationship },
    { title: "License Number", value: driver.license_number },
    {title: "license state", value: driver.license_state},
  ]

  const renderDriverproperties = () => {

    if (!isBolQuotesRates) {
      return displayedDriverProperties
    }
    else {
      return [...displayedDriverProperties, ...additionalDriverProperties]
    }
  }

  return (
    <div className='rate-item-card rate-driver bg-white rounded w-100'>
      <div className='d-flex align-items-center mb-5'>
        <div className='mr-3 icon'>{icon}</div>
        <div className='d-flex flex-column flex-grow-1'>
          <div className='title'>{name}</div>
        </div>
        {!isBolQuotesRates ? ( <div className='actions text-med-light'>
          <Link className='text-med-light' to={{ pathname: `/rates/drivers/${driver.id}/edit`, state: { prevPath: '/rates' }}}>
            <PencilIcon className="mr-3"/>
          </Link>
          <TrashIcon onClick={onDeleteDriver}/>
        </div>) : null}
      </div>
      { renderDriverproperties().map((item, index) =>
        <div key={index} className={"rate-item-card__attribute py-2 d-flex"}>
          <div className='w-50 title'>{item.title}</div>
          <div className='w-50 text-capitalize'>{item.value}</div>
        </div>
      )}
      <div className="mt-5">{ discounts }</div>
    </div>
  )
}

export default withTranslation(['quotes'])(RatedQuoteDriver)
