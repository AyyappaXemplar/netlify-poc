import React                 from 'react';
import { Form }              from 'react-bootstrap';
import { withTranslation }   from 'react-i18next';
import { Container, Button } from 'react-bootstrap';
import { useDispatch }       from 'react-redux';

import history         from "../../history";
import FormContainer   from '../shared/FormContainer';
import BadgeText       from '../shared/BadgeText';
import { createQuoteResponse } from '../../actions/quotes.js'

function QuotesNotCovered({ t, location }) {
  const dispatch = useDispatch()
  const useQuery = () => (new URLSearchParams(location.search))
  const zipCode = useQuery().get('location')

  const resetQuote = () => {
    dispatch(createQuoteResponse({}));
    history.push('/quotes/new');
  }

  return (
    <Container>
      <FormContainer bootstrapProperties={{lg: 6, xl: 5}}>
        <h2 className="font-weight-bold">{t('notCovered.title', { location: zipCode })}</h2>
        <p className="mb-5 text-med-dark">{t('notCovered.body', { location: zipCode })}</p>
        <Form>
          <div className='w-75 mx-auto'>
            <Button className='rounded-pill' size='lg' type="submit" block onClick={resetQuote}>
              {t('notCovered.submit')}
            </Button>
          </div>
        </Form>
      </FormContainer>
      <BadgeText/>
    </Container>
  )
}

export default withTranslation(['quotes'])(QuotesNotCovered);
