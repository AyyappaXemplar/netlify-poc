import React from 'react'
import { Container, Col, Row, Image } from 'react-bootstrap';

const FooterContent = () => {
    return (
        <>
            <Row className="justify-content-center">
                <Col className="col-md-6 d-flex flex-column jusify-content-center mb-5">
                    <p className="text-center"><strong>Need Help</strong></p>
                    <p className="text-center">Contact us with any questions regarding your quoting process. </p>
                    <button type="button" className="btn btn-link mb-3" href="tel:8443585605">(844) 358-5605</button>
                    <button type="button" className="btn btn-link mb-3" href="mailto:agent@insureonline.com">agent@insureonline.com</button>
                    <p className="text-center">6640 S Cicero Ave<br/>Bedford Park, IL 60638</p>
                </Col>
            </Row>
            </>
    )
}

export default FooterContent
