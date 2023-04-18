import React from 'react';
import CustomCard from './CustomCard'
import { ReactComponent as CheckIcon } from '../../images/check-circle-fill.svg';
import { ReactComponent as RedCrossIcon } from '../../images/red-cross.svg';

function Discount({ discount }) {
  const icon = <CheckIcon/>
  const crossIcon = <RedCrossIcon />
  const { title, body, applied } = discount
  const iconBg = applied ? 'text-success' : ''
  const iconImg = applied ? icon : crossIcon
  return <CustomCard icon={iconImg} title={title} body={body} iconBg={iconBg} bodyCss="text-primary"/>
}

export default Discount
