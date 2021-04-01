import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col }          from 'react-bootstrap';
import { ReactComponent as HomeIcon } from '../../images/home-icon.svg'

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

  const driverAddressSelected = selectedAddress === driverAddress

  const suggestedAddressSelected = selectedAddress === suggestedAddress

  return (
    <Modal show={show} size="lg" centered>
      <Modal.Body>
        <div className="p-4 w-90">
          <div>
            <HomeIcon/>
          </div>
          <h5 className="pt-4">Suggested Address</h5>
          <Form onSubmit={handleSubmit}>
            <Row className="text-left py-3">
              <Col>
                <div className={`border${driverAddressSelected ? " border-info" : ""} rounded h-100`}>
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
                      You Entered
                    </label>
                  </div>
                  <div className={`p-5 border-top${driverAddressSelected ? " border-info" : ""}`}>
                    {address(driverAddress)}
                  </div>
                </div>
              </Col>
              <Col>
                <div className={`border${suggestedAddressSelected ? " border-info" : ""} rounded h-100`}>
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
                  <div className={`p-5 border-top${suggestedAddressSelected ? " border-info" : ""}`}>
                    {address(suggestedAddress)}
                  </div>
                </div>
              </Col>
            </Row>
            <p className="text-align-center p-2 pt-3 mb-4"><b>Note:</b> Your entered address may not be deliverable if selected.</p>
            <Button
              className="rounded-pill w-75"
              size="lg"
              type="submit"
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
