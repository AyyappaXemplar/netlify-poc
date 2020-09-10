import React from 'react';
import history from '../../history'
import QuoteItemCard from './QuoteItemCard'
import { ReactComponent as AdultFemale } from '../../images/adult-female.svg';
import { ReactComponent as AdultMale } from '../../images/adult-male.svg';
import { ReactComponent as YoungFemale } from '../../images/young-female.svg';
import { ReactComponent as YoungMale } from '../../images/young-male.svg';
import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon } from '../../images/trash.svg'

const DriverIcons = {
  AdultFemale: AdultFemale,
  AdultMale: AdultMale,
  YoungFemale: YoungFemale,
  YoungMale: YoungMale
}

class Driver extends React.Component {
  constructor(props) {
    super(props)
    this.editDriver = this.editDriver.bind(this)
    this.deleteDriver = this.deleteDriver.bind(this)
  }

  driverIcon() {
    const { driver } = this.props
    const age = driver.birthday > 21 ? 'Adult' : 'Young'
    const gender = driver.gender === 'male' ? 'Male' : 'Female'
    const Icon = DriverIcons[`${age}${gender}`]
    return <Icon/>
  }

  editDriver() {
    const { driver } = this.props
    history.push(`/drivers/${driver.id}/edit`)
  }

  deleteDriver() {
    const { deleteDriver, t, driver } = this.props
    let confirmed = window.confirm(t('fields.driver.deleteConfirm'))

    if (confirmed) {
      deleteDriver(driver.id)
    }
  }

  render() {
    const { driver } = this.props
    const { first_name, last_name, gender, birthday } = driver

    const icon = this.driverIcon()
    const title = `${first_name} ${last_name}`
    const body = `${gender}, ${birthday} years old.`

    return (
      <QuoteItemCard icon={icon} title={title} body={body}>
        <div className='actions text-med-light'>
          <PencilIcon className="mr-3" onClick={this.editDriver}/>
          <TrashIcon onClick={this.deleteDriver}/>
        </div>
      </QuoteItemCard>
    )
  }
}

export default Driver
