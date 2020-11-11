import React from 'react'
import { Form } from 'react-bootstrap'
import './Radio.scss'
import classNames from 'classnames';

function Radio({ label, id, selected, type, onChange, inline, value, disabled }) {
  const custonRadioClasses = classNames({
    'custom-radio-container rounded mb-2': true,
    'custom-radio-container-inline': inline,
    selected})

  return (
    <div className={custonRadioClasses} onClick={onChange}>
      <Form.Check type={type} id={id} custom>
        <Form.Check.Input onChange={onChange} type={type} value={value} checked={selected} disabled={disabled}/>
        <Form.Check.Label className="font-weight-light">{label}</Form.Check.Label>
      </Form.Check>
    </div>
  )
}

export default Radio
