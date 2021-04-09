import React from 'react'
import { Form } from 'react-bootstrap'
import './Radio.scss'
import classNames from 'classnames';

function Radio({ label, id, selected, type, onChange, inline, value, disabled, isExcluded }) {
  const customRadioClasses = classNames({
    'custom-radio-container rounded mb-2': true,
    'custom-radio-container-inline': inline,
    disabled, selected})

  return (
    <div className={`${customRadioClasses} ${(selected && isExcluded) && "bg-dark"}`} onClick={ () => !disabled && onChange() }>
      <Form.Check type={type} id={id} custom>
        <Form.Check.Input onChange={onChange} type={type} value={value} checked={selected} disabled={disabled}/>
        <Form.Check.Label className={`font-weight-${ isExcluded ? "dark" : "light" }`}>{label}</Form.Check.Label>
      </Form.Check>
    </div>
  )
}

export default Radio
