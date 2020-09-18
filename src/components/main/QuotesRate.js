import React from 'react';
import { withTranslation } from 'react-i18next';
// import history from "../../history";
import TitleRow from "../shared/TitleRow";

class QuotesRate extends React.Component {
//   constructor(props) {
//     super(props)
//   }

  // componentDidMount() {
  // }

//   componentDidUpdate(prevProps, prevState) {
//     const prevRating = prevProps.state.ratingQuote
//     const { ratingQuote: rating } = this.props.state
//
//     const isRatingQuote = !prevRating && rating
//     const ratedQuote = prevRating && !rating
//
//     if (isRatingQuote) {
//       this.setState({ showSpinner: true})
//     }
//
//     if (ratedQuote) {
//       this.setState({ showSpinner: false}, () => {
//         history.push('/quote/rated')
//       })
//     }
//   }

  render() {
    const { t } = this.props;

    return (
      <>
        <TitleRow title={t('quotes:rate.title')}/>
      </>
    )
  }
}

export default withTranslation(['quotes'])(QuotesRate);
