import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { withTranslation, Trans }     from 'react-i18next';
import { Form, Button, Container,
         Row, Col }                   from 'react-bootstrap';

import history         from '../../history';
import mixpanel        from '../../config/mixpanel';
import { updateQuote } from '../../actions/quotes.js'

import StartOverButton from '../shared/StartOverButton'
import FormContainer   from '../shared/FormContainer';
import BadgeText       from '../shared/BadgeText';
import Radio           from '../forms/Radio'

function QuotesEdit({ t }) {
  const quote             = useSelector(state => state.data.quote)
  const updatingQuoteInfo = useSelector(state => state.state.updatingQuoteInfo)
  const formPrevFilled    = localStorage.getItem('filledQuoteEdit') && quote

  const dispatch = useDispatch()
  const [currently_insured, setInsured] = useState(formPrevFilled ? quote.currently_insured : undefined)
  const [homeowner, setHomeowner]       = useState(formPrevFilled ? quote.homeowner : undefined)
  const [submitted, setSubmitted]       = useState(false)

  useEffect(() => {
    mixpanel.track('Quote initiated', { zipCode: quote.zip_code })
  }, [quote.zip_code])

  useEffect(() => {
    if (submitted && !updatingQuoteInfo) history.push('/vehicles/new')
  }, [submitted, updatingQuoteInfo])

  const handleSubmit = (event) => {
    mixpanel.track('Start page')
    event.preventDefault()
    localStorage.setItem('filledQuoteEdit', true)
    dispatch(updateQuote({ currently_insured, homeowner }))
    setSubmitted(true)
  }

  const enabled = [homeowner, currently_insured].every(element => element !== undefined)

  return (
    <Container className="pt-base">
      <FormContainer bootstrapProperties={{md: 6}}>
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

          <div className='mb-4 mb-sm-5 d-flex flex-sm-row flex-column'>
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
            <p className="px-0 px-sm-3 mb-5 small text-med-dark text-center">
              <Trans i18nKey="quotesEdit:footerText">

                By clicking "Save & continue," you consent to Insure Online saving the information
                you entered and sharing it with insurance carriers so you can get the most up-to-date quotes,
                no matter what device you're using. Additionally, carriers may use this to obtain information
                about your credit history. You also agree to Insure Online’s<a href="/terms" className="text-muted font-weight-bold"> Privacy Policy </a>
                and
                <a href="/privacy" className="text-muted font-weight-bold"> Terms of Service. </a>
              </Trans>
            </p>
          </Col>
        </Row>
      </Container>
      <BadgeText/>
    </Container>
  );
}

export default withTranslation(['quotes'])(QuotesEdit);
