import React from 'react';
import QuoteItemCard from './QuoteItemCard'
import { ReactComponent as CheckIcon } from '../../images/check-circle-fill.svg';

function Discount({ discount }) {
  const icon = <CheckIcon/>
  const { title, body, applied } = discount
  const iconBg = applied ? 'text-success' : ''
  return <QuoteItemCard icon={icon} title={title} body={body} iconBg={iconBg} bodyCss="text-primary"/>
}

export default Discount
