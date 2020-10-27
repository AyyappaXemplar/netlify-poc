import React               from 'react';
import { useDispatch }     from 'react-redux'
import { withTranslation } from 'react-i18next';

import history from '../../history'
import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon }  from '../../images/trash.svg'

import getDriverIcon      from '../../services/driver-icon'
import { dateToAge }      from '../../services/driver-age'
import { deleteDriver }   from '../../actions/drivers'

function RatedQuoteDriver({ driver, t }) {
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

  const { first_name, last_name, birthday } = driver

  const icon = driverIcon()
  const name = `${first_name} ${last_name}`
  const age = `${dateToAge(birthday)} years old.`

  const displayedDriverProperties = [
    {title: "Gender", value: driver.gender},
    {title: "Age", value: age},
    {title: "Marital Status", value: driver.marital_status},
    {title: "License", value: driver.license_type}
  ]

  return (
    <div className='rate-item-card bg-white rounded p-4'>
      <div className='d-flex align-items-center mb-3'>
        <div className='mr-3 icon'>{icon}</div>
        <div className='d-flex flex-column flex-grow-1'>
          <div className='title'>{name}</div>
        </div>
        <div className='actions text-med-light'>
          <PencilIcon className="mr-3" onClick={() => history.push(`/rates/drivers/${driver.id}/edit`)}/>
          <TrashIcon onClick={onDeleteDriver}/>
        </div>
      </div>
      { displayedDriverProperties.map((item, index) =>
        <div key={index} className="rate-item-card__attribute py-2 d-flex">
          <div className='w-50 title'>{item.title}</div>
          <div className='w-50 text-capitalize'>{item.value}</div>
        </div>
      )}
    </div>
  )
}

export default withTranslation(['quotes'])(RatedQuoteDriver)
