import React from 'react'
import { Form } from 'react-bootstrap'
import './Radio.scss'
import classNames from 'classnames';

export default class Radio extends React.Component {

  render() {
    const { label, id, selected, type, onSelect } = this.props;

    const custonRadioClasses = classNames({ 'custom-radio-container rounded mb-3': true, selected })
    return (
      <div className={custonRadioClasses}>
        <Form.Check type={type} id={id} custom>
          <Form.Check.Input onChange={onSelect} type={type} value={label} checked={selected}/>
          <Form.Check.Label>{label}</Form.Check.Label>
        </Form.Check>
      </div>
    )
  }
}
