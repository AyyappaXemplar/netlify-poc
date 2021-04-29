import React from "react";
import { Modal, Button } from "react-bootstrap";


function DeliveryModal({showDeliveryModal, setShowDeliveryModal, deliveryModalValue}) {

  function modalCopy(modalValue) {
    const copy = modalValue ?
    "By changing to yes, delivery coverage will be added to your policy."
    : "By changing to no, delivery coverage will be removed from your policy."

    return copy
  }

  return (
    <>
      <Modal
        show={showDeliveryModal}
        onHide={() => setShowDeliveryModal(false)}
        size="md"
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0">
          <p className="p-3 mb-3">{modalCopy(deliveryModalValue)}</p>
          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg"
            size="lg"
            onClick={()=> setShowDeliveryModal(false)}
          >OK
          </Button>
        </Modal.Body>
      </Modal>
    </>  
  )
}

export default DeliveryModal
