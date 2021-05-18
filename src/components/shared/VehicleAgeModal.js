import React, { useEffect } from 'react';
import { Modal, Button }          from 'react-bootstrap';

export default function VehicleAgeModal({showVehicleAgeModal, setShowVehicleAgeModal}) {
  useEffect((prevState) => {
    if (showVehicleAgeModal){
      setShowVehicleAgeModal(true)
    } else {
      setShowVehicleAgeModal(false)
    }
  }, [showVehicleAgeModal, setShowVehicleAgeModal])

  return (
    <>
      <Modal
        show={showVehicleAgeModal}
        onHide={() => setShowVehicleAgeModal(false)}
        size="md"
        >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0">
          <span className="p-3 mb-3">Unfortunately, we are unable to provide a quote for a vehicle that is 30 years or older online. Please call us at (844) 358-5605 to speak with a representative.</span>
          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg"
            size="lg"
            onClick={()=> setShowVehicleAgeModal(false)}
          >OK
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}