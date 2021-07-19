import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch }  from 'react-redux'
import { withTranslation }           from "react-i18next";
import { Container, Row, Col,
         Button }                    from 'react-bootstrap';
import TitleRow          from '../shared/TitleRow';
import SpinnerScreen     from '../shared/SpinnerScreen';
import ErrorDisplay      from '../shared/ErrorDisplay';
import ContactCard       from '../shared/ContactCard'
import PolicyDetails     from './Confirmation/PolicyDetails';
import { getQuote }      from '../../actions/quotes';
import { useGetCarrier } from './Rates'
import facebook_icon from "../../images/Facebook_icon.svg"
import instagram_icon from "../../images/Instagram_icon.svg"
import linkedin_icon from "../../images/LinkedIn_icon.svg"
import mixpanel from "../../config/mixpanel"
import { getDeposit } from '../../services/rate-payment-details'

const Final = ({ t, match }) => {
  const { quoteId }                        = match.params
  localStorage.setItem('siriusQuoteId', quoteId)
  const { quote }                          = useSelector(redux => redux.data)
  const { gettingQuote }                   = useSelector(redux => redux.state)
  const [displayPage, setDisplayPage]      = useState(false)
  const dispatch                           = useDispatch()
  const carrier_id                         = quote.id ? quote.selected_rate.carrier_id : null
  const deposit                            = quote.id ? quote.selected_rate.deposit : 0
  const carrier                            = useGetCarrier(carrier_id)
  const { documents, term, policy_number } = quote.id ? quote : {}
  const document = documents ? documents.filter(d => { return d.type === "esign_packet" })[0] : null

  const goHomePage = () => {
    localStorage.removeItem('siriusQuoteId');
    localStorage.removeItem('filledQuoteEdit');
    window.location.href = 'https://www.insureonline.com'
  }

  useEffect(() => {
    mixpanel.track("Bind Online Policy Completed", {
      "Policy Number": quote.policy_number,
      "Amount Charged": getDeposit({deposit})
    })

    mixpanel.track("Pageview", {
      "Page Title": "Confirmation Completion",
      "Section": "Bind Online"
    })
  }, [quote.policy_number, deposit])

  useEffect(() => {
    if (!quote.id) {
      dispatch(getQuote(quoteId))
    }
  }, [quote.id, quoteId, dispatch])

  useEffect(() => {
    if (quote.errors) {
      setDisplayPage(true)
    } else if (!gettingQuote && carrier) {
      setDisplayPage(true)
    }
  }, [gettingQuote, carrier, quote])

  if (!displayPage || !quote.id) {
    return <SpinnerScreen title="We're almost done, hang tight" />
  } else {
    return (
      <Container>
        { quote.errors ?
          <Row className='justify-content-center mt-5 text-center'>
            <Col lg={5}>
              <ErrorDisplay object={quote}/>
              <ContactCard t={t}/>
            </Col>
          </Row> :
          <>
            <TitleRow title={t("youAreAllSet")} subtitle={t("checkYourEmail")} />

            <PolicyDetails deposit={deposit} carrier={carrier} document={document} term={term} policy_number={policy_number}/>
            <Row className='justify-content-center mt-5 text-center'>
              <Col lg={5}>
                <Button className="rounded-pill mb-5" size='lg' variant="primary" type="submit" block disabled={false} onClick={goHomePage}>
                  {t("goToHome")}
              </Button>
                <p><strong>{t("signaturePage.footer.subheading")}</strong></p>
                <p>{t("signaturePage.footer.submessage")}</p>
                <p>{t("signaturePage.footer.line2")}</p>
                <p><a href={`te:${t("signaturePage.footer.phoneNumber")}`} className="text-dark">{t("signaturePage.footer.phoneDisplay")}</a></p>
                <p><a href={`mailto:${t("signaturePage.footer.email")}`} className="text-primary">{t("signaturePage.footer.email")}</a></p>
                <div className="pb-3">
                  <a href="https://www.facebook.com/InsureOnline.comInc" target="_blank" rel="noopener noreferrer" className="pr-2"><img src={facebook_icon} alt="InsureOnline.com Facebook link"/></a>
                  <a href="https://www.instagram.com/insureonline.com_/" target="_blank" rel="noopener noreferrer" className="pr-2"><img src={instagram_icon} alt="InsureOnline.com Instagram link"/></a>
                  <a href="https://www.linkedin.com/company/insureonline/" target="_blank" rel="noopener noreferrer"><img src={linkedin_icon} alt="InsureOnline.com LinkedIn link"/></a>
                </div>
                <p>6640 S Cicero Ave<br />Bedford Park, IL 60638</p>
              </Col>
            </Row>
          </>
        }
      </Container>
    )
  }
}

export default withTranslation(['common'])(Final)
