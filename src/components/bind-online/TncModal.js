import React from "react";
import { Modal, Button } from "react-bootstrap";

function TncModal({showTncModal, setShowTncModal, tncModalValue}) {

  function modalCopy(modalValue) {
    const copy = modalValue ?
    "By changing to yes, rideshare (TNC) coverage will be added to your policy."
    : "By changing to no, rideshare (TNC) coverage will be removed from your policy."

    return copy
  }

  return (
    <>
      <Modal
        show={showTncModal}
        onHide={() => setShowTncModal(false)}
        size="md"
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0">
          <p className="p-3 mb-3">{modalCopy(tncModalValue)}</p>
          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg"
            size="lg"
            onClick={()=> setShowTncModal(false)}
          >OK
          </Button>
        </Modal.Body>
      </Modal>
    </>  
  )
}

export default TncModal
