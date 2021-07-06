import React from "react";
import { Modal, Button } from "react-bootstrap";
import CircleIcon from "./CircleIcon";
import icon from "../../images/mdpModalIcon.svg"
function MonitoredDriverModal({ show, setShowMDPmodal, mixpanel, history, quoteId, goToPaymentsPage }) {
  const handleSubmit = () => {
        // mixpanel.track('Click Select Payment Plan')
        setShowMDPmodal(false)
        goToPaymentsPage(false, true)
  }

  const handleCancel = () => {
    setShowMDPmodal(false)
    window.location = `/rates/${quoteId}/compare`
  }


  return (
    <Modal show={show} centered>
      <Modal.Header className={"border-bottom-0 pb-0"}>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => {  setShowMDPmodal(false) }}>
          <span aria-hidden="true">&times;</span>
        </button></Modal.Header>
      <Modal.Body className="d-flex flex-column p-3">

        <div className="mb-3"><CircleIcon iconSrc={icon}/></div>
        <p className="mb-3"><strong>Monitored Driver Program</strong></p>
        <p className="mb-3">USH&C Road Ranger Monitored Driver is a discount program created to reward safe driving. Participants simply download the mobile application (iOS & Andriod) to register and start saving.</p>

        <p>Before you pay, do you wish to continue with enrolling in the monitored driver program? </p>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column p-3 border-top-0">
      <Button className="btn-block btn-lg btn rounded-pill btn-primary" onClick={() => { handleSubmit() }}>Yes Continue to Pay</Button>
        <span onClick={() => { handleCancel() }} className="btn btn-link text-med-dark" style={{pointerEvents:"visible", textDecorationLine:"underline"}}>Cancel</span>
        </Modal.Footer>
    </Modal>
  );
}

export default MonitoredDriverModal;
