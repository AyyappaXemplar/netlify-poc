import React from 'react'
import { Modal, Button, Row, Col }          from 'react-bootstrap';
import { withTranslation } from "react-i18next";

function PayInFullModal({ t, showPayInfullModal, setShowPayInfullModal, quoteNumber }) {
  
  const linkStyles = {
    cursor:"pointer"
  }

  function closeModalAndOpenChat() {
    setShowPayInfullModal(false);
    if(window.HappyFoxChat) window.HappyFoxChat.expandChatbox();
  }
    return (
        <Modal show={showPayInfullModal} size="lg" centered>
            <Modal.Body className="p-4 w-90">
                <Row>
                    <Col className="py-4">
                        <h5 className="pb-4">{t("PayInFullModal.title")}</h5>
                        <div className="mb-4">
                        <p>{t("PayInFullModal.mainCopy")}</p>
                        <p className="my-1"><b>{quoteNumber}</b></p>
                        </div>
                        <div className="my-4">
                <p className="font-weight-bold link d-block text-align-center text-primary" onClick={closeModalAndOpenChat}><u className="p-0" style={linkStyles}>{t("PayInFullModal.agentCopy.web")}</u></p>
                           {t("PayInFullModal.agentCopy.phone.text")} <a href={`tel: ${t("PayInFullModal.agentCopy.phone.number")}`} className="d-block text-primary"><u>{t("PayInFullModal.agentCopy.phone.number")}</u></a>
                           {t("PayInFullModal.agentCopy.email.text")} <a href={`mailto: ${t("PayInFullModal.agentCopy.email.link")}?subject=${quoteNumber}`} className="d-block text-primary"><u>{t("PayInFullModal.agentCopy.email.link")}</u></a>
                        </div>
                        <Button size="lg" className="rounded-pill mt-2 w-75" onClick={() => setShowPayInfullModal(false)}>{t("close")}</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
export default withTranslation(["common"])(PayInFullModal)
