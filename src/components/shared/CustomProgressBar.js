import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { progressBarPercentages } from '../../constants/progress-bar-percentages'

class CustomProgressBar extends React.Component {
  render() {
    const { progress, t } = this.props
    const now = progressBarPercentages[progress]

    return (
      <React.Fragment>
        <div className='d-flex justify-content-between pb-2'>
          <span className="small">{t('start')}</span>
          <span className="small">{t('drivers')}</span>
          <span className="small">{t('vehicles')}</span>
          <span className="small">{t('discounts')}</span>
        </div>
        <ProgressBar now={now} variant='primary' />
      </React.Fragment>
    )
  }
}

export default withTranslation(['progressBar'])(CustomProgressBar);
