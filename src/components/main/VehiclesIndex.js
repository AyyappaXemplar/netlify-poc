import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import history from '../../history';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import Vehicle from '../shared/Vehicle'
import QuoteItemCard from '../shared/QuoteItemCard'
import { ReactComponent as SampleIcon } from '../../images/sample.svg';

class VehiclesIndex extends React.Component {
  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.VEHICLES)
  }

  componentDidUpdate(prevProps, prevState) {
    // const prevUpdate = prevProps.state.creatingVehicle
    // const { creatingVehicle } = this.props.state
    // const requestFired = prevUpdate && !creatingVehicle

    // const prevVehicles = prevProps.data.vehicles.length
    // const vehicles = this.props.data.vehicles.length
    // const vehicleAdded = prevVehicles < vehicles

    // if (requestFired & vehicleAdded) {
    //   history.push('/vehicles')
    // }
  }

  render() {
    const { t } = this.props
    // let { vehicles } = this.props.data
    const vehicles = [{
      "manufacturer": "Acura",
      "model": "MDX",
      "year": 2017,
      "use_code": "commuting",
      "trim": "3.5 XL",
    },
    {
      "manufacturer": "Honda",
      "model": "Civic",
      "year": 2017,
      "use_code": "farming",
      "trim": "3.0 M",
    }]

    return (
      <Container>
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <h1>{t('vehiclesIndex:title')}</h1>
            <p>{t('vehiclesIndex:subtitle')}</p>
          </Col>
        </Row>
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <h3>{t('vehiclesIndex:fields.vehicle.title')}</h3>
            <div>
              { vehicles.map((vehicle, index) => <Vehicle key={index} vehicle={vehicle}/>)}
            </div>
            <div className="mb-3">{t('vehiclesIndex:fields.vehicle.addVehicle')}</div>
            <Button className="mb-5" size="lg">{t('vehiclesIndex:fields.vehicle.saveButton')}</Button>
          </Col>
        </Row>
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <h3>{t('vehiclesIndex:fields.discounts.title')}</h3>
            <div>
              <QuoteItemCard icon={<SampleIcon/>} title={'2007 BMW 328 XI'} body={'Commute to work or school'}/>
              <QuoteItemCard icon={<SampleIcon/>} title={'2007 BMW 328 XI'} body={'Commute to work or school'}/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation(['vehiclesIndex', 'common'])(VehiclesIndex)
