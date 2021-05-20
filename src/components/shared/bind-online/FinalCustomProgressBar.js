import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { finalProgressBarPercentages } from '../../../constants/progress-bar'

function CustomProgressBar({ progress, t }) {
  const now = finalProgressBarPercentages[progress]

  return (
    <div className="custom-progress-bar my-2 my-lg-0 mx-auto">
      <div className='d-flex justify-content-between pb-2'>
        <span className="small">{t("payments")}</span>
        <span className="small">{t("signatures")}</span>
        <span className="small">{t("confirmation")}</span>
      </div>
      <ProgressBar now={now} variant='primary' />
    </div>
  )
}

export default withTranslation(['common'])(CustomProgressBar);
