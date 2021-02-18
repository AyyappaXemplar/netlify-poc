import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col }          from 'react-bootstrap';
import Radio from '../forms/Radio';
import { ReactComponent as HomeIcon } from '../../images/home-icon.svg'
import './AddressValidate.scss';


export default function AddressValidationModal({driverAddress, suggestedAddress, show, setShow, setDriver, setAlreadyDisplayed}) {
  const [selectedAddress, setSelectedAddress] = useState()
  const [disableSubmit, setDisableSubmit] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()
    setDriver(previousDriver => {
      const newDriver = { ...previousDriver }
      newDriver.address = selectedAddress
      return newDriver
    })
    setShow(false)
    setAlreadyDisplayed(true)
  }

  const address = (address) =>
      <>
        <p>{address.line1}, {address.line2 ? address.line2 : ""}</p>
        <p>{address.city}, {address.state}</p>
        <p>{address.zip_code || address.zip}</p>
      </>

  const driverAddressSelected = selectedAddress === driverAddress ? " border-info" : ""

  const suggestedAddressSelected = selectedAddress === suggestedAddress

  return (
    <Modal show={show} size="lg" centered>
      <Modal.Body>
        <div className="p-4 w-100">
          <div>
            <HomeIcon/>
          </div>
          <h5>Suggested Address</h5>
          <Form onSubmit={handleSubmit}>
            <Row className="text-left">
              <Col>
                <div className={`border${driverAddressSelected ? " border-info" : ""} rounded`}>
                  <div className="custom-control custom-radio m-3">
                    <input
                      type="radio"
                      checked={selectedAddress === driverAddress}
                      className="custom-control-input"
                      id="driverAddress"
                      onChange={() => {
                              setSelectedAddress(driverAddress)
                              setDisableSubmit(false)
                            }}
                    />
                    <label className="ml-2 mb-0 custom-control-label" htmlFor="driverAddress">
                      Suggested
                    </label>
                  </div>
                </div>
                <div className={`p-3 border${driverAddressSelected ? " border-info" : ""}`}>
                  {address(driverAddress)}
                </div>
              </Col>
              <Col>
                <div className={`border${suggestedAddressSelected ? " border-info" : ""} rounded`}>
                  <div className="custom-control custom-radio m-3">
                    <input
                      type="radio"
                      checked={selectedAddress === suggestedAddress}
                      className="custom-control-input"
                      id="suggestedAddress"
                      onChange={() => {
                              setSelectedAddress(suggestedAddress)
                              setDisableSubmit(false)
                            }}
                    />
                    <label className="ml-2 mb-0 custom-control-label" htmlFor="suggestedAddress">
                      Suggested
                    </label>
                  </div>
                  <div className={`p-3 border-top${suggestedAddressSelected ? " border-info" : ""}`}>
                    {address(suggestedAddress)}
                  </div>
                </div>
              </Col>
            </Row>
            <Button
              type='submit'
              disabled={disableSubmit}
            >
              Apply
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>



          
  )
}
