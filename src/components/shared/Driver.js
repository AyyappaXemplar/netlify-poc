import React from 'react';
import history from '../../history'
import QuoteItemCard from './QuoteItemCard'
import { withTranslation } from 'react-i18next';
import { ReactComponent as PersonIcon } from '../../images/person-circle.svg';
import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon } from '../../images/trash.svg'

class Driver extends React.Component {
  constructor(props) {
    super(props)
    this.editDriver = this.editDriver.bind(this)
    this.deleteDriver = this.deleteDriver.bind(this)
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
    const { t, driver } = this.props
    const { first_name, last_name, gender, birthday } = driver

    const icon = <PersonIcon/>
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

export default withTranslation(['quotes'])(Driver)
