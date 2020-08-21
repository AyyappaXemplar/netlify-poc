import React from 'react'
import { Form } from 'react-bootstrap'
import './Radio.scss'
import classNames from 'classnames';

class Radio extends React.Component {
  render() {
    const { label, id, selected, type, onChange, inline, value } = this.props;
    const custonRadioClasses = classNames({
      'custom-radio-container rounded mb-3': true,
      'custom-radio-container-inline': inline,
      selected})

    return (
      <div className={custonRadioClasses} onClick={onChange}>
        <Form.Check type={type} id={id} custom>
          <Form.Check.Input onChange={onChange} type={type} value={value} checked={selected}/>
          <Form.Check.Label>{label}</Form.Check.Label>
        </Form.Check>
      </div>
    )
  }
}

export default Radio
