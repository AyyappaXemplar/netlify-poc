import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { withTranslation }            from 'react-i18next';
import { Form, Button, Container,
         Row, Col }                   from 'react-bootstrap';
import history                        from '../../history';
import mixpanel                       from '../../config/mixpanel';
import { updateQuote }                from '../../actions/quotes.js'
import StartOverButton                from '../shared/StartOverButton'
import FormContainer                  from '../shared/FormContainer';
import BadgeText                      from '../shared/BadgeText';
import Radio                          from '../forms/Radio'
import InputMask                      from "react-input-mask"
import {getTimestamp}                 from "../../services/timestamps"
import { Helmet } from 'react-helmet';

function QuotesEdit({ t }) {

  const quote                             = useSelector(state => state.data.quote)
  const updatingQuoteInfo                 = useSelector(state => state.state.updatingQuoteInfo)
  const formPrevFilled                    = localStorage.getItem('filledQuoteEdit') && quote

  const dispatch = useDispatch()
  const [currently_insured, setInsured]   = useState(formPrevFilled ? quote.currently_insured : undefined)
  const [homeowner, setHomeowner]         = useState(formPrevFilled ? quote.homeowner : undefined)
  const [submitted, setSubmitted]         = useState(false)

  const prior_policy_obj  = {
    insurer_name: undefined,
    term_expiration: undefined,
    "duration": 6,
    "continuous": false
  }

  const [prior_policy, setPriorPolicy] = useState(prior_policy_obj);

  useEffect(() => {
    mixpanel.track("Quick Quote Started")

    mixpanel.track('Pageview', {
      "Page Title": "Basic Information",
      "Section": "Quick Quote"
    });

    mixpanel.identify(quote?.id);
  }, [quote.zip_code, quote.id])

  useEffect(() => {
    if (submitted && !updatingQuoteInfo) history.push('/vehicles/new')
  }, [submitted, updatingQuoteInfo])

  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem('filledQuoteEdit', true);
    if (prior_policy.term_expiration) {
      prior_policy.term_expiration = getTimestamp(prior_policy.term_expiration);
      dispatch(updateQuote({ ...quote, currently_insured, homeowner, prior_policy}))
    } else {
      dispatch(updateQuote({ ...quote, currently_insured, homeowner}))
    }
    setSubmitted(true)
  }

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(homeowner !== undefined && currently_insured === false)
    if (currently_insured === true) {
      setEnabled(prior_policy.insurer_name !== undefined && prior_policy.term_expiration !== undefined)
    };

  }, [homeowner, currently_insured, prior_policy])

  function createMarkup() { return {__html: t('terms')}; };
  return (

    <Container className="pt-base">
      <Helmet>
        <title>Edit quote | InsureOnline.com</title>
      </Helmet>
      <FormContainer bootstrapProperties={{lg:6}}>
        <h2 className="mb-4 mb-sm-5 font-weight-bold ">{t('edit.title')}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Label>{t('edit.fields.home.label')}</Form.Label>

          <div className='mb-3 d-flex flex-sm-row flex-column'>
            { t('edit.fields.home.options').map((item, index) =>
              <Radio
                type={'radio'} id={`info-home-${item.value}`}
                label={item.label}
                value={item.value}
                key={index}
                selected={homeowner === item.value}
                onChange={() => setHomeowner(item.value)} inline={true}
              />

            )}
          </div>

          <Form.Label>{t('edit.fields.car.label')}</Form.Label>

          <div className='mb-4 mb-sm-3 d-flex flex-sm-row flex-column'>
            { t('edit.fields.car.options').map((item, index) =>
              <Radio
                type={'radio'} id={`info-car-${item.value}`}
                label={item.label}
                value={item.value}
                key={index}
                selected={currently_insured === item.value}
                onChange={() => setInsured(item.value)} inline={true}
              />
            )}
          </div>

          { currently_insured &&
            <>
            <Form.Label>{t("insuranceNameProvider")}</Form.Label>
            <Form.Control type="text" className="mb-3"
              value={prior_policy.insurer_name}
               onChange={(event) => {
                  event.persist();
                  setPriorPolicy({...prior_policy, insurer_name: event.target.value})
                }}
            />

          <Form.Label>{t("expirationDateCopy")}</Form.Label>
            <InputMask
                className="rounded custom-radio-container font-weight-light mb-5"
                type="input"
                mask="99/99/9999"
                maskChar="-"
                placeholder="mm/dd/yyyy"
                value={prior_policy.term_expiration}
                onChange={(event) => {
                  event.persist();
                  setPriorPolicy({...prior_policy, term_expiration: event.target.value})
                }}
              />
            </>
          }

          <div className='w-100 w-sm-75 mx-auto'>
            <Button className="rounded-pill mb-3" size='lg' variant="primary" type="submit" block disabled={!enabled}>
              {t('edit.submit')}
            </Button>

            <StartOverButton/>
          </div>
        </Form>
      </FormContainer>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <p className="px-0 px-sm-0 mb-5 small text-med-dark text-center">
              { <span dangerouslySetInnerHTML={createMarkup()} />}
            </p>
          </Col>
        </Row>
      </Container>
      <BadgeText/>
    </Container>
  );
}

export default withTranslation(['quotes'])(QuotesEdit);
