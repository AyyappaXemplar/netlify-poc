import React, { useEffect}        from 'react';
import { useSelector }            from 'react-redux'
import {
  Container,
  Row, Col, Button
}                                 from 'react-bootstrap';
import TitleRow                   from '../shared/TitleRow';
import PolicyDetails              from './Confirmation/PolicyDetails';
import { withTranslation }        from "react-i18next";
import {getCompleteQuote}         from '../../actions/bol'
import {useDispatch}              from 'react-redux' 
const Confirmation = ({ t }) => {
  
const quote = useSelector(redux => redux.data.quote)
const dispatch = useDispatch()
const updatingQuoteInfo = useSelector(redux => redux.state.updatingQuoteInfo) 

  useEffect(() => {
   dispatch(getCompleteQuote(quote.id))

  }, [quote.id, dispatch])
  
  return (
    !updatingQuoteInfo && <Container >
      <TitleRow title={"Your all set !"} subtitle={"Check your email for policy details and account information."} />
      {/* <PaymentDetails /> */}
      <PolicyDetails quote={quote}/>
      <Row className='justify-content-center mt-5 text-center'>
        <Col lg={5}>
          <Button className="rounded-pill mb-5" size='lg' variant="primary" type="submit" block disabled={false}>
            Got To Home
          </Button>
          <p><strong>{t("signaturePage.footer.subheading")}</strong></p>
          <p>{t("signaturePage.footer.submessage")}</p>
          <p>{t("signaturePage.footer.line2")}</p>
          <p><a href={`te:${t("signaturePage.footer.phoneNumber")}`} className="text-dark">{ t("signaturePage.footer.phoneDisplay")}</a></p>
          <p><a href={`mailto:${t("signaturePage.footer.email")}`} className="orange">{ t("signaturePage.footer.email")}</a></p>
          <p>6640 S Cicero Ave<br/>Bedford Park, IL 60638</p>
        </Col>
      </Row>
    </Container>
  )
}

export default withTranslation(['common'])(Confirmation);
