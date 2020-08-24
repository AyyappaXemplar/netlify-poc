import React from 'react';
import FormContainer from '../shared/FormContainer';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages';
import history from '../../history';
import Radio from '../forms/Radio';

class VehiclesAdd extends React.Component {
  constructor(props) {
    super(props)
    this.state = { use_code: false, year: false, manufacturer: false, model: false, trim: false }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.DRIVERS)
  }

  handleSubmit(event) {

  }

  render() {
    const { t } = this.props
    const enabled = this.state.carInsurance && this.state.homeOwnership

    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{md: {span: 6, offset: 3}}}>
          <h2 className="mb-5 font-weight-bold ">{t('vehiclesAdd.title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label>{t('vehiclesAdd.fields.vehicle.label')}</Form.Label>
            <div className='mb-3'>
              { t('vehiclesAdd.fields.vehicle.fields').map((item, index) =>

                <Form.Group controlId="exampleForm.SelectCustom" key={index}>
                  <Form.Control as="select" custom>
                    <option>{item.label}</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>

              )}
            </div>
            <Form.Label>{t('vehiclesAdd.fields.car.label')}</Form.Label>
            <div className='mb-5'>
              { t('vehiclesAdd.fields.car.useCode').map((item, index) =>
                <Radio
                  type={'radio'} id={`info-car-${item.value}`}
                  label={item.label}
                  value={item.value}
                  key={index}
                  selected={this.state.use_code === item.value}
                  onChange={() => this.setState({'use_code': item.value})}/>
              )}
            </div>
            <div className='w-75 mx-auto'>
              <Button size='lg' variant="primary" type="submit" block disabled={!enabled}>
                {t('vehiclesAdd.submit')}
              </Button>
            </div>
          </Form>
        </FormContainer>
        <Container>
          <Row>
            <Col md={{span:6, offset: 3}}>
              <p className="small text-med-dark">
                <ShieldLogo className='mr-2'/>{t('zip.badgeText')}
              </p>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTranslation()(VehiclesAdd)
