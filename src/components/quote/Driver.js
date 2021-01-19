import React               from 'react';
import { useDispatch }     from 'react-redux'
import { withTranslation } from 'react-i18next';

import history           from '../../history'
import { deleteDriver }  from '../../actions/drivers.js'
import getDriverIcon     from '../../services/driver-icon'
import { dateToAge }     from '../../services/driver-age'

import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon }  from '../../images/trash.svg'
import CustomCard                    from '../shared/CustomCard'

function Driver({ t, driver }) {
  console.log("props", driver)
  const dispatch = useDispatch()

  const driverIcon = () => {
    const Icon = getDriverIcon(driver)
    return <Icon/>
  }

  const editDriver = () => {
    history.push(`/drivers/${driver.id}/edit`)
  }

  const onDeleteDriver = () => {
    let confirmed = window.confirm(t('fields.drivers.deleteConfirm'))

    if (confirmed) {
      dispatch(deleteDriver(driver.id))
    }
  }

  const { first_name, last_name, gender, birthday } = driver
  const birthdayDisplay = dateToAge(birthday)
  const genderTitleized = gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : '';

  const title = `${first_name} ${last_name}`
  const body = `${genderTitleized}, ${birthdayDisplay} years old.`

  return (
    <CustomCard icon={driverIcon()} title={title} body={body}>
      <div className='actions text-med-light'>
        <PencilIcon className="mr-3" onClick={editDriver}/>
        <TrashIcon onClick={onDeleteDriver}/>
      </div>
    </CustomCard>
  )
}

export default withTranslation(['quotes'])(Driver)
