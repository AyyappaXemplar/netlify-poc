import React from 'react';
import QuoteItemCard from './QuoteItemCard'
import { withTranslation } from 'react-i18next';
import { ReactComponent as SampleIcon } from '../../images/sample.svg';

function Vehicle({ t, vehicle }) {
  const icon = <SampleIcon/>
  const { year, manufacturer, model, trim } = vehicle
  const title = `${year} ${manufacturer} ${model} ${trim}`
  const body = t(`vehiclesAdd:fields.use.useCode.${vehicle.use_code}.label`)

  return <QuoteItemCard icon={icon} title={title} body={body}/>
}

export default withTranslation(['vehiclesAdd'])(Vehicle)
