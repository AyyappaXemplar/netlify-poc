import React        from 'react'
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import featureImage from "../../images/feature_signature.svg"

const Signatures = () => {
    return (
            
        <Container>
            <Row className="justify-content-center">
                <Col lg={6} className="d-flex flex-column justify-content-center">
                    <h1>One Last Thing!</h1>
                    <p>In order to finalize your new policy, you’ll need to sign a few documents. By clicking the link below, you’ll be taken to our external system to finish your document signings and confirm your policy. </p>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col lg={6} className="d-flex justify-content-center" >
                    <div  style={{width:"304px", height:'304px', backgroundColor:'#FEEFE9'}} className="rounded-circle d-flex justify-content-center align-items-center">
                        <Image src={featureImage} width="195px" height="169px" />
                    </div>
                </Col>
            </Row>
            <Row className='justify-content-center mt-5'>
                <Col lg={5}>
                    <Button className="rounded-pill mb-3" size='lg' variant="primary" type="submit" block disabled={false}>
                            Sign Documents Here
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-5 mb-5">
                    <p><strong>Need Help?</strong></p>
                    <p>Contact us with any questions you have regarding your offer. </p>
                    <p>When calling, please have your quote number ready.</p>
                    <p><a href="tel:8443585605" className="text-dark">(844) 358-5605</a></p>
                    <p><a href="mailto:agent@insureonline.com" className="orange">agent@insureonline.com</a></p>
                    <p>6640 S Cicero Ave<br/>Bedford Park, IL 60638</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Signatures
