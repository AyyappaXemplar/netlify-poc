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
import { fetchDocuments }                   from '../../actions/quotes';
import { useGetCarrier }                    from './Rates'

const Confirmation = ({ t, match }) => {
  const quoteId                                   = match.params.quoteId
  const quote                                     = useSelector(redux => redux.data.quote)
  const finishedFetchingDocuments                 = useSelector(redux => redux.state.finishedFetchingDocuments)
  const [displayPage, setDisplayPage]             = useState(false)
  const dispatch                                  = useDispatch()
  const carrier                                   = useGetCarrier(quote.selected_rate.carrier_id)
  const { documents, term, policy_number }        = quote;

  useEffect(() => {
    dispatch(fetchDocuments(quoteId))
  }, [dispatch, quoteId])

  useEffect(() => {
    if (!finishedFetchingDocuments && carrier) setDisplayPage(true)
  }, [finishedFetchingDocuments, carrier])


  if (!displayPage) {
    return <SpinnerScreen title="We're almost done, hang tight" />
  } else {
    return (
      <Container >
        <TitleRow title={"You are all set!"} subtitle={"Check your email for policy details and account information."} />
        <PaymentDetails />
        <PolicyDetails carrier={carrier} documents={documents} term={term} policy_number={policy_number}/>
        <Row className='justify-content-center mt-5 text-center'>
          <Col lg={5}>
            <Button className="rounded-pill mb-5" size='lg' variant="primary" type="submit" block disabled={false}>
              Got To Home
          </Button>
            <p><strong>{t("signaturePage.footer.subheading")}</strong></p>
            <p>{t("signaturePage.footer.submessage")}</p>
            <p>{t("signaturePage.footer.line2")}</p>
            <p><a href={`te:${t("signaturePage.footer.phoneNumber")}`} className="text-dark">{t("signaturePage.footer.phoneDisplay")}</a></p>
            <p><a href={`mailto:${t("signaturePage.footer.email")}`} className="text-primary">{t("signaturePage.footer.email")}</a></p>
            <p>6640 S Cicero Ave<br />Bedford Park, IL 60638</p>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default withTranslation(['common'])(Confirmation)
