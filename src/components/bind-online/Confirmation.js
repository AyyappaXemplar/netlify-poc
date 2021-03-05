
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
import { getQuote, fetchDocuments }         from '../../actions/quotes';
import {
  useCarrier, useRate,
  useGetRatesAndCarriers
}                                           from '../main/Rate';
import { useParams }                        from "react-router-dom";


const Confirmation = ({ t }) => {

  let { quoteId }                                 = useParams()
  const quote                                     = getQuote(quoteId)
  const [rates, carriers]                         = useGetRatesAndCarriers(quote.id)
  const [displayPage, setDisplayPage]             = useState(false)
  const [fetchingDocuments, setFetchingDocuments] = useState(false)
  const dispatch                                  = useDispatch()
  const fetchingQuoteDocuments                    = useSelector(state => state.state.fetchingQuoteDocuments)
  const rate                                      = useRate(rates)
  const carrier                                   = useCarrier(rate, carriers)


  useEffect(() => {
    dispatch(fetchDocuments({ signed: true }))
    setFetchingDocuments(true)
  }, [dispatch])

    useEffect(() => {
      if (fetchingDocuments && !fetchingQuoteDocuments) setDisplayPage(true)
    }, [fetchingDocuments, fetchingQuoteDocuments])


    if (!displayPage) {
      return <SpinnerScreen title="We're almost done, hang tight" />
    } else {
      return (
        <Container >
          <TitleRow title={"You are all set !"} subtitle={"Check you're email for policy details and account information."} />
          <PaymentDetails />
          <PolicyDetails carrier={carrier} />
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
