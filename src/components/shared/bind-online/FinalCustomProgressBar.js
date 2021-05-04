import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { finalProgressBarPercentages } from '../../../constants/progress-bar'

function CustomProgressBar({ progress }) {
  const now = finalProgressBarPercentages[progress]

  return (
    <div className="custom-progress-bar my-2 my-lg-0 mx-auto">
      <div className='d-flex justify-content-between pb-2'>
        <span className="small">Payments</span>
        <span className="small">Signatures</span>
        <span className="small">Confirmation</span>
      </div>
      <ProgressBar now={now} variant='primary' />
    </div>
  )
}

export default withTranslation(['common'])(CustomProgressBar);
