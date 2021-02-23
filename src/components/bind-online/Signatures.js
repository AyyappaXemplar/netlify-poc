import React, { useState } from 'react';
import {
    Row, Col,
    Image,
    Container,
    Button
}                          from "react-bootstrap";
import featureImage        from "../../images/feature_signature.svg";
import { withTranslation } from 'react-i18next';
import SignatureModal      from './signature/SignatureModal'; 

const Signatures = ({ t }) => {
  const [showSignatureModalState, updateShowModalState] = useState(false)
    return (
      
  <Container>
    <Row className="justify-content-center">
      <Col lg={6} className="d-flex flex-column justify-content-center">
        <h1>{t("signaturePage.header")}</h1>
        <p>{t("signaturePage.message")}</p>
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
          <Button className="rounded-pill mb-3" size='lg' variant="primary" type="submit" block disabled={false} onClick={()=>updateShowModalState(true)}>
            {t("signaturePage.cta")}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5 mb-5">
          <p><strong>{t("signaturePage.footer.subheading")}</strong></p>
          <p>{t("signaturePage.footer.submessage")}</p>
          <p>{t("signaturePage.footer.line2")}</p>
          <p><a href={`te:${t("signaturePage.footer.phoneNumber")}`} className="text-dark">{ t("signaturePage.footer.phoneDisplay")}</a></p>
          <p><a href={`mailto:${t("signaturePage.footer.email")}`} className="orange">{ t("signaturePage.footer.email")}</a></p>
          <p>6640 S Cicero Ave<br/>Bedford Park, IL 60638</p>
        </Col>
      </Row>
      <SignatureModal showSignatureModalState={showSignatureModalState} updateShowModalState={updateShowModalState}/>
  </Container>
    )
}

// export default Signatures
export default withTranslation(['common'])(Signatures);
