import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Col }          from 'react-bootstrap';
import { withTranslation }    from "react-i18next";

const PayInFullModal = ({ t, show }) => {

    useEffect(() => {
        if (typeof window !== `undefined`) {

            window.HFCHAT_CONFIG = {
              EMBED_TOKEN: '999cd250-875a-11eb-9669-6fc7a3f61b09',
              ASSETS_URL: `https://widget.happyfoxchat.com/v2/visitor`
            }
        }
    })

    const [modalState, setModalState] = useState(show)
    
    return (
        <Modal show={modalState} size="lg" centered>
            <Modal.Body className="p-4 w-90">
                <Row>
                    <Col className="py-4">
                        <h5 className="pb-4">{t("PayInFullModal.title")}</h5>
                        <div className="mb-4">
                            <p>{t("PayInFullModal.mainCopy")}</p>
                        </div>
                        <div className="my-4">
                            <p onClick={() => <script async={true} src={`${window.HFCHAT_CONFIG.ASSETS_URL}/js/widget-loader.js`}></script>}>{t("PayInFullModal.agentCopy.web")}</p>
                            <p>{t("PayInFullModal.agentCopy.phone")}</p>
                            <p>{t("PayInFullModal.agentCopy.email")}</p>
                        </div>
                        <Button size="lg" className="rounded-pill mt-2 w-75" onClick={() => setModalState(!show)}>Close</Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default withTranslation(["modals"])(PayInFullModal)
