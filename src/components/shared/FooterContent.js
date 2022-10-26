import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { withTranslation } from "react-i18next"

const FooterContent = ({ t }) => {
    return (
        <>
            <Row className="justify-content-center">
                <Col className="col-md-6 d-flex flex-column jusify-content-center mb-5">
                    <p className="text-center"><strong>{t("signaturePage.footer.subheading")}</strong></p>
                    <p className="text-center">{t("signaturePage.footer.submessage")}</p>
                    <button type="button" className="btn btn-link text-primary mb-1" href="tel:8443585605">(844) 358-5605</button>
                    <button type="button" className="btn btn-link text-primary mb-1" href="mailto:info@insureonline.com">info@insureonline.com</button>
                    <p className="text-center">6640 S. Cicero Ave<br/>Bedford Park, IL 60638</p>
                </Col>
            </Row>
            </>
    )
}

export default withTranslation(["common"])(FooterContent)
