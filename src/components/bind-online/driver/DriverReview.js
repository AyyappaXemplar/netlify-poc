import React               from 'react'
import { withTranslation } from 'react-i18next';

import CustomCard          from '../../shared/CustomCard'
import { ReactComponent as PencilIcon } from '../../../images/pencil.svg'
import { ReactComponent as CheckIcon } from '../../../images/check-circle-fill.svg'

import history          from '../../../history'
import getDriverIcon     from '../../../services/driver-icon'
import { dateToAge }     from '../../../services/driver-age'

function DriverReview({ t, driver }) {
  const driverIcon = () => {
    const Icon = getDriverIcon(driver)
    return <Icon/>
  }

  const editDriver = (driver) => {
    history.push(`/bol/drivers/${driver.id}/edit`)
  }

  const { first_name, last_name, gender, birthday } = driver
  const title = `${first_name} ${last_name}`
  const birthdayDisplay = dateToAge(birthday)
  const genderTitleized = gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : ''
  const body = `${genderTitleized}, ${birthdayDisplay} years old.`




  const completedIcon = false ? <div className="text-success"><CheckIcon/></div> :
      <div className='d-flex actions'>
        <PencilIcon className="mr-3" onClick={() => editDriver(driver.id)}/>
      </div>


  return (
    <CustomCard icon={driverIcon()} title={title} body={body}
      key={`review-driver-${driver.id}`}>
      { completedIcon }
    </CustomCard>
  )
}

export default withTranslation(['drivers'])(DriverReview)
