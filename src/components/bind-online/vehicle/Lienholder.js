import React, { useState } from 'react';
import { Form } from 'react-bootstrap'

import Radio from '../../forms/Radio';

const initialLienholder = {
  institution_name: '',
  lienholder_type: '',
  address:{
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip_code: ''
  }
}

export default function Lienholder({ t, setVehicle }) {
  const [showForm, setShowForm]     = useState(true)
  const [lienholder, setLienholder] = useState(initialLienholder)

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

  const setLienholderAddress = (event, prop) => {
    event.persist()

    const address = { ...lienholder.address }
    address[prop] = event.target.value
    setLienholder(prevLienholder => ( { ...prevLienholder, address }))

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
            value={lienholder.institution_name}
            onChange={(event) => {
              event.persist()
              setLienholder(lienholder => ({...lienholder, institution_name: event.target.value}) )
            }}
          />

          <Form.Label>Lienholder Type</Form.Label>
          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="lienholder"
            value={lienholder.lienholder_type}
            onChange={(event) => {
              event.persist()
              setLienholder(lienholder => ({...lienholder, lienholder_type: event.target.value}) )
            }}
          />
          <Form.Label>Policy Holder Address</Form.Label>
          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="Address"
            value={lienholder.address.line1}
            onChange={ event => {setLienholderAddress(event, 'line1')}}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="Apt"
            value={lienholder.address.line2}
            onChange={ event => {setLienholderAddress(event, 'line2')}}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="City"
            value={lienholder.address.city}
            onChange={(event) => {setLienholderAddress(event, 'city')}}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="ZIP"
            value={lienholder.address.zip_code}
            onChange={(event) => {setLienholderAddress(event, 'zip_code')}}
          />

          <Form.Control
            className="font-weight-light mb-2"
            type="text"
            placeholder="State"
            value={lienholder.address.state}
            onChange={(event) => {setLienholderAddress(event, 'state')}}
          />
        </>
      }
    </>
  )
}
