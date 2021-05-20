import React, { useEffect } from 'react';
import { Modal, Button }          from 'react-bootstrap';
import { withTranslation }            from 'react-i18next'

function VehicleAgeModal({t, showVehicleAgeModal, setShowVehicleAgeModal}) {
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
        show={true}
        onHide={() => setShowVehicleAgeModal(false)}
        size="md"
        >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0">
          <span className="p-3 mb-3">{t('vehicleAgeModal.message')}</span>
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

export default withTranslation(['vehicles'])(VehicleAgeModal)
