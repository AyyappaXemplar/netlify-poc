
import React, { useEffect, useState}        from 'react';
import { useSelector, useDispatch }         from 'react-redux'
import {
  Container,
  Row, Col, Button
}                                           from 'react-bootstrap';
import TitleRow                             from '../shared/TitleRow';
import SpinnerScreen                        from '../shared/SpinnerScreen';
import PaymentDetails                       from './Confirmation/PaymentDetails';
import PolicyDetails                        from './Confirmation/PolicyDetails';
import { withTranslation }                  from "react-i18next";
import { useParams }                        from "react-router-dom";
import { fetchDocuments }         from '../../actions/quotes';

const Confirmation = ({ t }) => {

  let { quoteId }                                 = useParams()
  const quote                                     = useSelector(redux => redux.data.quote)
  const fetchingQuoteDocuments                    = useSelector(state => state.state.fetchingQuoteDocuments)
  const [displayPage, setDisplayPage]             = useState(false)
  const [fetchingDocuments, setFetchingDocuments] = useState(false)
  const dispatch                                  = useDispatch()
  const carrier                                   = quote.carrier[0]
  const { documents, term }                       = quote;

  useEffect(() => {
    dispatch(fetchDocuments({ signed: true }, quoteId))
    setFetchingDocuments(true)
  }, [dispatch, quoteId])

    useEffect(() => {
      if (fetchingDocuments && !fetchingQuoteDocuments) setDisplayPage(true)
    }, [fetchingDocuments, fetchingQuoteDocuments])


    if (!displayPage) {
      return <SpinnerScreen title="We're almost done, hang tight" />
    } else {
      return (
        <Container >
          <TitleRow title={"You are all set !"} subtitle={"Check your email for policy details and account information."} />
          <PaymentDetails />
          <PolicyDetails carrier={carrier} documents={documents} term={term}/>
          <Row className='justify-content-center mt-5 text-center'>
            <Col lg={5}>
              <Button className="rounded-pill mb-5" size='lg' variant="primary" type="submit" block disabled={false}>
                Got To Home
            </Button>
              <p><strong>{t("signaturePage.footer.subheading")}</strong></p>
              <p>{t("signaturePage.footer.submessage")}</p>
              <p>{t("signaturePage.footer.line2")}</p>
              <p><a href={`te:${t("signaturePage.footer.phoneNumber")}`} className="text-dark">{t("signaturePage.footer.phoneDisplay")}</a></p>
              <p><a href={`mailto:${t("signaturePage.footer.email")}`} className="orange">{t("signaturePage.footer.email")}</a></p>
              <p>6640 S Cicero Ave<br />Bedford Park, IL 60638</p>
            </Col>
          </Row>
        </Container>
      )
    }
  }


export default withTranslation(['common'])(Confirmation)
