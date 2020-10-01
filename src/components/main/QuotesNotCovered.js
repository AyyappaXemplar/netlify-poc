import React from 'react';
import FormContainer from '../shared/FormContainer';
import { withTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import history from "../../history";
import BadgeText from '../shared/BadgeText';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';

class QuotesNotCovered extends React.Component {
  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.START)
  }

  handleSubmit(event) {
    history.push('/quotes/new')
  }

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
              {/* TODO: This should be a Link */}
              <Button className='rounded-pill' size='lg' type="submit" block>
                {t('notCovered.submit')}
              </Button>
            </div>
          </Form>
        </FormContainer>
        <BadgeText/>
      </>
    );
  }
}

export default withTranslation(['quotes'])(QuotesNotCovered);
