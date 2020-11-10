import React from 'react';
import { withTranslation } from 'react-i18next';
import { ReactComponent as CalendarIcon } from '../../images/calendar-icon.svg';

function PolicyLength({ term }) {
  return (
    <div className="coverage-graph-item">
      <CalendarIcon />
      <span>{term.duration}-Month Policy</span>
    </div>
  )
}

export default withTranslation(['quotes'])(PolicyLength)
