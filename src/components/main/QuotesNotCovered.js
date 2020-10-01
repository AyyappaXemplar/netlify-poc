import React from 'react';
import FormContainer from '../shared/FormContainer';
import { withTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import BadgeText from '../shared/BadgeText';

class QuotesNotCovered extends React.Component {
  useQuery() {
    return new URLSearchParams(this.props.location.search);
  }

  render() {
    const { t } = this.props;
    const location = this.useQuery().get('location')

    return (
      <>
        <FormContainer bootstrapProperties={{lg: 6, xl: 5}}>
          <h2 className="font-weight-bold">{t('notCovered.title', { location })}</h2>
          <p className="mb-5 text-med-dark">{t('notCovered.body', { location })}</p>
          <Form onSubmit={this.handleSubmit}>
            <div className='w-75 mx-auto'>
              <Link className="rounded-pill btn btn-primary btn-block btn-lg" to="/quotes/new">
                {t('notCovered.submit')}
              </Link>
            </div>
          </Form>
        </FormContainer>
        <BadgeText/>
      </>
    );
  }
}

export default withTranslation(['quotes'])(QuotesNotCovered);
