import React from 'react';
import history from '../../history'
import { withTranslation } from 'react-i18next';
import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon } from '../../images/trash.svg'
import getDriverIcon from '../../services/driver-icon'

class RatedQuoteDriver extends React.Component {
  constructor(props) {
    super(props)
    this.editDriver = this.editDriver.bind(this)
    this.deleteDriver = this.deleteDriver.bind(this)
  }

  driverIcon() {
    const { driver } = this.props
    const age = driver.birthday > 21 ? 'Adult' : 'Young'
    const gender = driver.gender === 'male' ? 'Male' : 'Female'
    const Icon = getDriverIcon(`${age}${gender}`)
    return <Icon/>
  }

  editDriver() {
    const { driver } = this.props
    history.push(`/drivers/${driver.id}/edit`)
  }

  deleteDriver() {
    const { deleteDriver, driver, t } = this.props
    let confirmed = window.confirm(t('fields.drivers.deleteConfirm'))

    if (confirmed) {
      deleteDriver(driver.id)
    }
  }

  render() {
    const { driver } = this.props
    const { first_name, last_name, birthday } = driver

    const icon = this.driverIcon()
    const name = `${first_name} ${last_name}`
    const age = `${birthday} years old.`

    const displayedDriverProperties = [
      {title: "Gender", value: driver.gender},
      {title: "Age", value: age},
      {title: "Marital Status", value: driver.marital_status},
      {title: "License", value: driver.license_type}
    ]

    return (
      <div className='rated-quote-item-card bg-white rounded p-4 mb-4'>
        <div className='d-flex align-items-center mb-3'>
          <div className='mr-3 icon'>{icon}</div>
          <div className='d-flex flex-column flex-grow-1'>
            <div className='title'>{name}</div>
          </div>
          <div className='actions text-med-light'>
            <PencilIcon className="mr-3" onClick={this.editDriver}/>
            <TrashIcon onClick={this.deleteDriver}/>
          </div>
        </div>
        { displayedDriverProperties.map((item, index) =>
          <div key={index} className="rated-quote-item-card__attribute py-2 d-flex">
            <div className='w-50 title'>{item.title}</div>
            <div className='w-50 text-capitalize'>{item.value}</div>
          </div>
        )}
      </div>
    )
  }
}

export default withTranslation(['quotes'])(RatedQuoteDriver)
