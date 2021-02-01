import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

import Radio from '../../forms/Radio';

export default function Lienholder({ t, lienholder, dispatch }) {
  const [showForm, setShowForm] = useState(!!lienholder.name)

  const checkBoxes = () => {
    let values = [
      {value: true, label: 'yes'},
      {value: false, label: 'no'}
    ]

    return values.map(item => {

      return(
        <Radio
          key={`lienholder-${item.label}`}
          type='radio'
          label={item.label}
          value={item.value}
          selected={showForm === item.value}
          onChange={() => setShowForm(item.value)}
        />
      )
    })
  }

  return (
    <>
      <Form.Label>Lienholder</Form.Label>
      { checkBoxes() }
      { showForm &&
        <>
          <Form.Label>Lienholder Institution Name</Form.Label>
          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="Capital One Auto"
            name='institution'
            value={lienholder.name}
            onChange={(event) => {
              dispatch({type: 'updateLienholder', payload: { name: event.target.value }})
            }}
          />

          <Form.Label>Lienholder Type</Form.Label>
          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="lienholder"
            value={lienholder.lienholder_type}
            name='lienholder_type'
            onChange={(event) => {
              dispatch({type: 'updateLienholder', payload: { type: 1 }})
            }}
          />
          <Form.Label>Policy Holder Address</Form.Label>
          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            name='address[line1]'
            placeholder="Address"
            value={lienholder.address.line1}
            onChange={(event) => {
              dispatch({type: 'updateLienholderAddress', payload: { line1: event.target.value }})
            }}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            name='address[line2]'
            placeholder="Apt"
            value={lienholder.address.line2}
            onChange={(event) => {
              dispatch({type: 'updateLienholderAddress', payload: { line2: event.target.value }})
            }}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="City"
            value={lienholder.address.city}
            onChange={(event) => {
              dispatch({type: 'updateLienholderAddress', payload: { city: event.target.value }})
            }}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            name='address[zip_code]'
            placeholder="ZIP"
            value={lienholder.address.zip_code}
            onChange={(event) => {
              dispatch({type: 'updateLienholderAddress', payload: { zip_code: event.target.value }})
            }}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="State"
            name='address[state]'
            value={lienholder.address.state}
            onChange={(event) => {
              dispatch({type: 'updateLienholderAddress', payload: { state: event.target.value }})
            }}
          />
        </>
      }
    </>
  )
}
