import React from 'react';
import { withTranslation } from 'react-i18next';

function RateIntro({ carrier, t, classes, bolTitle=false }) {
  return (
    <div className={classes}>
      <h1 className="h1-lg mb-2">{`${bolTitle ? t('rate.BolTitle') : t('rate.title')}`}</h1>

      <p className="text-med-dark mb-4">
        We’ve put together the the best quote possible based on the information you provided.
        We recommend {carrier.name} as your carrier!
      </p>
    </div>
  )
}

export default withTranslation(['quotes'])(RateIntro)
