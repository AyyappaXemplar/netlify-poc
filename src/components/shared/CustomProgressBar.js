import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { progressBarPercentages } from '../../constants/progress-bar'

class CustomProgressBar extends React.Component {
  render() {
    const { progress, t } = this.props
    const now = progressBarPercentages[progress]

    return (
      <div className="custom-progress-bar my-5 my-lg-0 mx-auto">
        <div className='d-flex justify-content-between pb-2'>
          <span className="small">{t('common:progressBar.start')}</span>
          <span className="small">{t('common:progressBar.vehicles')}</span>
          <span className="small">{t('common:progressBar.drivers')}</span>
          <span className="small">{t('common:progressBar.discounts')}</span>
        </div>
        <ProgressBar now={now} variant='primary' />
      </div>
    )
  }
}

export default withTranslation(['common'])(CustomProgressBar);
