import React from 'react';
import { withTranslation } from 'react-i18next';

function RateIntro({ carrier, t, classes, bolTitle = false }) {
  function createMarkup() { return {__html: `${t("quoteMessaging.part1")} ${carrier.name} ${t("quoteMessaging.part2")}`}; };

  return (
    <div className={classes}>
      <h1 className="h1-lg mb-2">{`${bolTitle ? t('rate.BolTitle') : t('rate.title')}`}</h1>

      <p className="text-med-dark mb-4">
      <div dangerouslySetInnerHTML={createMarkup()} />
      </p>
    </div>
  )
}

export default withTranslation(['quotes'])(RateIntro)
