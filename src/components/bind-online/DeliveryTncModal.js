import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

function DeliveryTncModal({showDeliveryTncModal, setShowDeliveryTncModal, history}) {

  const copy = "This selection does not match the details provided for your vehicle(s). To apply or remove rideshare or delivery coverage please return and "

  return (
    <>
      <Modal
        show={showDeliveryTncModal}
        onHide={() => setShowDeliveryTncModal(false)}
        size="md"
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0">
          <span className="p-3 mb-3">{copy}<Link to={'/bol/quotes/vehicles'}> edit your vehicle.</Link></span>
          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg"
            size="lg"
            onClick={()=> setShowDeliveryTncModal(false)}
          >OK
          </Button>
        </Modal.Body>
      </Modal>
    </>  
  )
}

export default DeliveryTncModal
