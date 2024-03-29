import React from 'react';
import DashIcon from './DashCircle';


export default function CustomAlert({ text }) {
  return (
    <div className="form-errors border-0 rounded mb-3 p-3 text-danger font-weight-bolder d-flex align-items-center">
      <DashIcon classes="flex-none" />
      <span className='ml-3'>{text}</span>
    </div>
  )
}

