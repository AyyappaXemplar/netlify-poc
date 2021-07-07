import React               from "react";
import { Modal, Button }   from "react-bootstrap";
import CircleIcon          from "./CircleIcon";
import icon                from "../../images/mdpModalIcon.svg";
import { withTranslation } from 'react-i18next';

function MonitoredDriverModal({ show, setShowMDPmodal, quoteId, t, setmDpAccepted }) {
  const handleSubmit = () => {
    setShowMDPmodal(false);
    setmDpAccepted(true)
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
        <p className="mb-3"><strong>{ t("monitoredDriverModal.title") }</strong></p>
        <p className="mb-3">{  t("monitoredDriverModal.copy1")  }</p>

        <p>{ t("monitoredDriverModal.copy2") }</p>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-column p-3 border-top-0">
      <Button className="btn-block btn-lg btn rounded-pill btn-primary" onClick={() => { handleSubmit() }}>{ t("monitoredDriverModal.button") }</Button>
        <span onClick={() => { handleCancel() }} className="btn btn-link text-med-dark" style={{pointerEvents:"visible"}}>{ t("monitoredDriverModal.cancel") }</span>
        </Modal.Footer>
    </Modal>
  );
}

export default withTranslation(['quotes'])(MonitoredDriverModal);
