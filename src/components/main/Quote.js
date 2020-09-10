import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import history from '../../history';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import QuoteVehicles from '../../containers/QuoteVehicles'
import QuoteDrivers from '../../containers/QuoteDrivers'
import QuoteDiscounts from '../../containers/QuoteDiscounts'
import QuoteScreenStructure from '../../constants/quote-screen-structure'
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
    this.continue = this.continue.bind(this)
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.VEHICLES)
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
    this.setState({ resource })
  }

  continue() {
    const url = this.screenStructure.saveUrl
    history.push(url)
  }

  itemsBeforeButton(param) {
    const resource = param || this.state.resource
    const screenStructure = this.quoteScreenStructure[resource]
    return screenStructure.itemsBeforeButton.map(item => {
      const Component = this.RESOURCE_COMPONENTS[item]
      return <Component key={item}/>
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
    const { t } = this.props
    const { resource } = this.props.match.params
    const link = this.quoteScreenStructure[resource].saveUrl
    const title = t(`${resource}.title`)
    const subtitle = t(`${resource}.subtitle`)
    const buttonText = t(`${resource}.saveButton`)


    return (
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <h1>{title}</h1>
            <p className="text-med-dark mb-5">{subtitle}</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={6}>

            { this.itemsBeforeButton(resource) }

            <div className="w-50 mx-auto">
              <Link className="rounded-pill btn btn-primary btn-block btn-lg" to={link}>{buttonText}</Link>
            </div>

            { this.itemsAfterButton(resource) }

          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation(['quotes'])(Quote)
