import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

function CustomProgressBar({ now, t }) {
  return (
    <React.Fragment>
      <div className='d-flex justify-content-between pb-2'>
        <span className="small">{t('progressBar.start')}</span>
        <span className="small">{t('progressBar.drivers')}</span>
        <span className="small">{t('progressBar.vehicles')}</span>
        <span className="small">{t('progressBar.discounts')}</span>
      </div>
      <ProgressBar now={now} variant='primary' />
    </React.Fragment>
  )
}

export default withTranslation()(CustomProgressBar);
