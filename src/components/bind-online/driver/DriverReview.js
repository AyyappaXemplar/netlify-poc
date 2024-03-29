import React                            from 'react'
import { withTranslation }              from 'react-i18next';

import CustomCard                       from '../../shared/CustomCard'
import { ReactComponent as PencilIcon } from '../../../images/pencil.svg'
import { ReactComponent as CheckIcon }  from '../../../images/check-circle-fill.svg'
import { ReactComponent as AlertIcon }  from '../../../images/alert-fill.svg'

import history                           from '../../../history'
import getDriverIcon                     from '../../../services/driver-icon'
import { dateToAge }                     from '../../../services/driver-age'

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
  const genderTitleized = gender ? t(`gender.${gender}`): ''
  const body = `<span style="text-transform:capitalize">${genderTitleized}</span>, ${birthdayDisplay} years old.`;
  function createMarkup() { return {__html: body}; };
  const completedIcon = driver.isValid ? <div className="text-success mr-3"><CheckIcon/></div> :
                                           <div className="text-warning mr-3 d-flex align-items-center flex-column"><AlertIcon/><p className="mb-0">{ t("status.incomplete") }</p></div>

  return (
    <CustomCard icon={driverIcon()} title={title} body={<span dangerouslySetInnerHTML={createMarkup()} />}
      key={`review-driver-${driver.id}`}>
      { completedIcon }
      <div className='d-flex actions'>
        <PencilIcon className="mr-3" onClick={() => editDriver(driver)}/>
      </div>
    </CustomCard>
  )
}

export default withTranslation(['drivers'])(DriverReview)
