import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import history from '../../history';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import Vehicle from '../../containers/Vehicle'
import Discount from '../shared/Discount'
import { ReactComponent as PlusIcon } from '../../images/plus-circle-fill.svg';
import classNames from 'classnames';

class VehiclesIndex extends React.Component {
  MAX_VEHICLES = 6

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.VEHICLES)
  }

  addVehicle() {
    const { vehicles } = this.props.data
    const { setAlert, t } = this.props

    if (vehicles.length >= this.MAX_VEHICLES) {
      setAlert({
        variant: 'danger',
        text: t('vehiclesIndex:fields.vehicle.error', { maxVehicleNumber: this.MAX_VEHICLES })
      })
    } else {
      history.push('/vehicles/new')
    }

  }

  continue() {
    history.push('/drivers/new')
  }

  render() {
    const { t } = this.props
    let { vehicles } = this.props.data
    const addVehicleDisabled = vehicles.length >= this.MAX_VEHICLES
    const addVehicleClassNames = classNames(
      'border-0 rounded-0 mb-5 text-dark font-weight-bolder d-flex justify-content-center align-items-center',
      { disabled: addVehicleDisabled }
    )

    return (
      <Container>
        <Row className="justify-content-center">
          <Col lg={6}>
            <h1>{t('vehiclesIndex:title')}</h1>
            <p className="text-med-dark mb-5">{t('vehiclesIndex:subtitle')}</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={6}>
            <label>{t('vehiclesIndex:fields.vehicle.title')}</label>
            <div>
              { vehicles.map((vehicle, index) => <Vehicle key={index} vehicle={vehicle}/>) }
            </div>
            <Button
              className={addVehicleClassNames}
              size="lg"
              variant="med-light"
              onClick={this.addVehicle.bind(this)}
              block>
              <PlusIcon className="mr-2"/>
              {t('vehiclesIndex:fields.vehicle.addVehicle')}
            </Button>
            <div className="w-50 mx-auto">
              <Button
                onClick={this.continue.bind(this)}
                className="mb-5 rounded-pill"
                size="lg"
                block>
                {t('vehiclesIndex:fields.vehicle.saveButton')}
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mb-5 justify-content-center">
          <Col lg={6}>
            <label>{t('vehiclesIndex:fields.discounts.title')}</label>
            <div>
              <Discount discount={ {title: 'Homeowners discount', body: 'Save up to 10%', applied: true} }/>
              <Discount discount={ {title: 'Currently insured discount', body: 'Save up to 50%', applied: true} }/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation(['vehiclesIndex', 'common'])(VehiclesIndex)

  // vehicles = [{
  //   "manufacturer": "Acura",
  //   "model": "MDX",
  //   "year": 2017,
  //   "use_code": "commuting",
  //   "trim": "3.5 XL",
  // },
  // {
  //   "manufacturer": "Honda",
  //   "model": "Civic",
  //   "year": 2017,
  //   "use_code": "farming",
  //   "trim": "3.0 M",
  // }]
