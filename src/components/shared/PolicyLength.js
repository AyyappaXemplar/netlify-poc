import React from 'react';
import { withTranslation } from 'react-i18next';
import { ReactComponent as CalendarIcon } from '../../images/calendar-icon.svg';

function PolicyLength({ term, t }) {
  return (
    <div className="coverage-graph-item d-flex align-items-center">
      <CalendarIcon />
      <span>{term.duration}{t("monthPolicy")}</span>
    </div>
  )
}

export default withTranslation(['quotes'])(PolicyLength)
