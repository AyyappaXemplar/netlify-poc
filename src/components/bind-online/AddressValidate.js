import React, { useState } from 'react';
import { Modal, Form, Button, Row }          from 'react-bootstrap';
import Radio from '../forms/Radio';

// import './TransitionModal.scss';
// import SubmitButton from './SubmitButton'



export default function AddressValidationModal({driverAddress, suggestedAddress, show, setShow, setDriver}) {
  const [selectedAddress, setSelectedAddress] = useState()
  // console.log(suggestedAddress)
  // console.log(driverAddress)

  const handleSubmit = (event) => {
    event.preventDefault()
    setDriver(previousDriver => {
      const newDriver = { ...previousDriver }
      newDriver.address = selectedAddress
      return newDriver
    })
    setShow(false)
  }

  const address = (address) => {
      return <div>
        <p>{address.line1}</p>
        <p>{address.line2}</p>
        <p>{address.city}</p>
        <p>{address.state}</p>
        <p>{address.zip_code || address.zip}</p>
      </div>
  }

  return (
    <Modal show={show} size="lg" centered>
      <Modal.Body>
        <div className="m-5">
          <h5>Suggested Address</h5>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Radio
                type={'radio'}
                label='You Entered'
                value={driverAddress}
                selected={selectedAddress === driverAddress}
                onChange={() => { setSelectedAddress(driverAddress) }}
              />
              <div>{address(driverAddress)}</div>
              <Radio
                type={'radio'}
                label='Suggested'
                value={suggestedAddress}
                selected={selectedAddress === suggestedAddress}
                onChange={() => { setSelectedAddress(suggestedAddress) }}
              />
            </Row>
            <div>{address(suggestedAddress)}</div>
            <Button
              type='submit'
            >
              Apply
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  )
}