import React  from 'react';
import Toggle from 'react-toggle'
import 'react-toggle/style.css';
import './CustomToggle.scss';

export default function CustomToggle({ onChange, checked }) {
  return (
    <Toggle
      icons={false}
      checked={checked}
      name='burritoIsReady'
      value='yes'
      className='custom-toggle'
      onChange={onChange}
    />
  )
}
