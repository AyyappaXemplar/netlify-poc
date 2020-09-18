import React from 'react';
// import FormContainer from '../shared/FormContainer';
import { withTranslation } from 'react-i18next';
import history from "../../history";

class QuotesSubmit extends React.Component {
  constructor(props) {
    super(props)

    this.state = { showSpinner: false }
  }

  componentDidMount() {
    const { rateQuote } = this.props
    rateQuote()
  }

  componentDidUpdate(prevProps, prevState) {
    const prevRating = prevProps.state.ratingQuote
    const { ratingQuote: rating } = this.props.state

    const isRatingQuote = !prevRating && rating
    const ratedQuote = prevRating && !rating

    // console.log(`prevRating: ${prevRating}, now: ${rating}`)

    if (isRatingQuote) {
      this.setState({ showSpinner: true})
    }

    if (ratedQuote) {
      this.setState({ showSpinner: false}, () => {
        history.push('/quote/rated')
      })
    }
  }

  render() {
    const { t } = this.props;
    const { showSpinner } = this.state

    return (
      <>
        <h1>{t('quotes:submit.title')}</h1>
        {
          showSpinner &&
          <div>
            <div className="spinner-border"role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      </>
    )
  }
}

export default withTranslation(['quotes'])(QuotesSubmit);
