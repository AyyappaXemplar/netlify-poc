import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import QuoteVehicles from '../../containers/QuoteVehicles'
import QuoteDrivers from '../../containers/QuoteDrivers'
import QuoteDiscounts from '../../containers/QuoteDiscounts'
import QuoteScreenStructure from '../../constants/quote-screen-structure'
import TitleRow from '../shared/TitleRow'
import { Link } from 'react-router-dom'

class Quote extends React.Component {
  RESOURCE_COMPONENTS = {
    drivers: QuoteDrivers,
    vehicles: QuoteVehicles,
    discounts: QuoteDiscounts
  }

  constructor(props) {
    super(props)
    this.quoteScreenStructure = QuoteScreenStructure
    this.state = { resource: 'vehicles' }
  }

  componentDidMount() {
    this.setResource()
  }

  componentDidUpdate(prevProps, prevState) {
    const { resource } = this.state

    const prevResource = prevState.resource
    if (resource !== prevResource) {
      this.setResource(resource)
    }
  }

  setResource(param) {
    const resource = param || this.props.match.params.resource || 'fullQuote'

    this.setState({ resource }, this.setProgress)
  }

  setProgress() {
    const { resource } = this.state
    const { setProgress } = this.props
    const screenStructure = this.quoteScreenStructure[resource]
    setProgress(screenStructure.progressBarStatus)

  }

  itemsBeforeButton(param) {
    const resource = param || this.state.resource
    const screenStructure = this.quoteScreenStructure[resource]
    return screenStructure.itemsBeforeButton.map(item => {
      const Component = this.RESOURCE_COMPONENTS[item]
      return <Component key={item} showWarnings={screenStructure.showWarnings}/>
    })
  }

  itemsAfterButton(param) {
    const resource = param || this.state.resource
    const screenStructure = this.quoteScreenStructure[resource]
    return screenStructure.itemsAfterButton.map(item => {
      const Component = this.RESOURCE_COMPONENTS[item]
      return <Component key={item} disabled={true}/>
    })
  }

  render() {
    window.scrollTo({ top: 0 });
    const { t } = this.props
    const { resource } = this.props.match.params
    const link = this.quoteScreenStructure[resource].saveUrl
    const title = t(`${resource}.title`)
    const subtitle = t(`${resource}.subtitle`)
    const buttonText = t(`${resource}.saveButton`)


    return (
      <>
        <TitleRow title={title} subtitle={subtitle}/>
        <Row className="justify-content-center">
          <Col lg={6}>

            { this.itemsBeforeButton(resource) }

            <div className="w-50 mx-auto mb-5">
              <Link className="rounded-pill btn btn-primary btn-block btn-lg" to={link}>{buttonText}</Link>
            </div>

            { this.itemsAfterButton(resource) }

          </Col>
        </Row>
      </>
    );
  }
}

export default withTranslation(['quotes'])(Quote)
