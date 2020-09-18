import React from 'react';
import { withTranslation } from 'react-i18next';
import history from "../../history";
import TitleRow from "../shared/TitleRow";

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

    if (isRatingQuote) {
      this.setState({ showSpinner: true})
    }

    if (ratedQuote) {
      this.setState({ showSpinner: false}, () => {
        history.push('/quotes/rate')
      })
    }
  }

  render() {
    const { t } = this.props;
    const { showSpinner } = this.state

    return (
      <>
        <TitleRow colClassNames='text-center' title={t('quotes:submit.title')}/>
        {
          showSpinner &&
          <div class="text-center">
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
