import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { withTranslation }            from 'react-i18next';
import { Form, Button, Container }    from 'react-bootstrap';

// import history         from '../../../history';
import { updateQuote } from '../../../actions/quotes.js'
import { addMessage }  from '../../../actions/messages'

import Conversation    from '../../shared/conversation/Conversation';
import StartOverButton from '../../shared/StartOverButton'
import Radio           from '../../forms/Radio'

function ConversationQuotesEdit({ t }) {
  const quote             = useSelector(state => state.data.quote)
  const updatingQuoteInfo = useSelector(state => state.state.updatingQuoteInfo)
  const formPrevFilled    = localStorage.getItem('filledQuoteEdit') && quote

  const dispatch = useDispatch()
  const [currently_insured, setInsured] = useState(formPrevFilled ? quote.currently_insured : undefined)
  const [homeowner, setHomeowner]       = useState(formPrevFilled ? quote.homeowner : undefined)
  const [submitted, setSubmitted]       = useState(false)

  useEffect(() => {
    const initialMessage = {
      from: 'bot',
      statements: ["Now we can start with some basic information about yourself",
                   "Do you own or rent?"]
    }
    dispatch(addMessage(initialMessage))
  }, [dispatch])

  useEffect(() => {
    if (submitted && !updatingQuoteInfo) {
      // history.push('/vehicles/new')
    }
  }, [submitted, updatingQuoteInfo])

  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem('filledQuoteEdit', true)
    dispatch(updateQuote({ currently_insured, homeowner }))
    setSubmitted(true)
  }

  const enabled = [homeowner, currently_insured].every(element => element !== undefined)

  return (
    <>
      <Conversation/>
      <Container className="pt-base">
        <Form onSubmit={handleSubmit}>

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
      </Container>
    </>
  );
}

export default withTranslation(['quotes'])(ConversationQuotesEdit);
