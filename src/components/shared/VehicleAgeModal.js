import React from 'react';
import { Modal, Button }          from 'react-bootstrap';

export default function VehicleAgeModal({showVehicleAgeModal, setShowVehicleAgeModal}) {

  return (
    <>
      <Modal
        show={showVehicleAgeModal}
        onHide={() => setShowVehicleAgeModal()}
        size="md"
        >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0">
          <span>Unfortunately, we are unable to provide a quote for a vehicle that is 30 years or older online. Please call us at (844) 358-5605 to speak with a representative.</span>
          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg"
            size="lg"
            onClick={()=> setShowVehicleAgeModal()}
          >OK
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}