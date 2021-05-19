import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { bolProgressBarPercentages } from '../../../constants/progress-bar'

function BolCustomProgressBar({ progress, t }) {
  const now = bolProgressBarPercentages[progress]

  return (
    <div className="custom-progress-bar my-2 my-lg-0 mx-auto">
      <div className='d-flex justify-content-between pb-2'>
      <span className="small">{t('progressBar.policy')}</span>
        <span className="small">{t('progressBar.drivers')}</span>
        <span className="small">{t('progressBar.vehicles')}</span>
        <span className="small">{t('progressBar.coverages')}</span>
        <span className="small">{t('progressBar.questions')}</span>
        <span className="small">{t('progressBar.review')}</span>
      </div>
      <ProgressBar now={now} variant='primary' />
    </div>
  )
}

export default withTranslation(['common'])(BolCustomProgressBar);
 