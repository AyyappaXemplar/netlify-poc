import React from 'react'
import { Form } from 'react-bootstrap'
import './Radio.scss'
import classNames from 'classnames';

function Radio({ label, id, selected, type, onChange, inline, value, disabled }) {
  const customRadioClasses = classNames({
    'custom-radio-container rounded mb-2 font-weight-light': true,
    'custom-radio-container-inline': inline,
    'custom-radio-container bg-light': disabled,
    selected})

  return (
      <Form.Check type={'radio'} id={id} custom>
        <Form.Check.Input onChange={onChange} type={type} value={value} checked={selected} disabled={disabled}/>
        <Form.Check.Label className={customRadioClasses}>The label</Form.Check.Label>
      </Form.Check>
  )
}

export default Radio
