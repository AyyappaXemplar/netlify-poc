import React from 'react';
import FormContainer from '../shared/FormContainer';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { ReactComponent as ShieldLogo } from '../../images/no-spam-shield.svg';
import { ProgressBarStatus } from '../../constants/progress-bar-percentages'
import Radio from '../forms/Radio'


class StartInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { carInsurance: undefined, homeOwnership: undefined }
  }

  componentDidMount() {
    const { setProgress } = this.props
    setProgress(ProgressBarStatus.DRIVERS)
  }

  render() {
    const { t } = this.props
    const changeHomeOwnership = event => this.setState({ homeOwnership: event.target.value })
    const changeCarInsurance  = event => this.setState({ carInsurance:  event.target.value })
console.log(t('info.fields.home.options'))
    return (
      <React.Fragment>
        <FormContainer bootstrapProperties={{md: {span: 6, offset: 3}}}>
          <h2 className="mb-5 font-weight-bold ">{t('info.title')}</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label>{t('info.fields.home.label')}</Form.Label>
            <div className=''>
              { t('info.fields.home.options').map((item, index)=>

              <Radio type={'radio'} id={'info-home-own'}
                     label={t('info.fields.home.options.own.label')}
                     value={t('info.fields.home.options.own.value')}
                     selected={this.state.homeOwnership === t('info.fields.home.options.own.value')}
                     onChange={changeHomeOwnership} inline={true}/>

              ) }
            </div>
            <Form.Label>{t('info.fields.car.label')}</Form.Label>
            <div className=''>
              <Radio
                type={'radio'} id={'info-car-true'}
                label={t('info.fields.car.options.true.label')}
                value={t('info.fields.car.options.true.value')}
                selected={this.state.carInsurance === t('info.fields.car.options.true.value')}
                onChange={changeCarInsurance} inline={true}/>
              <Radio
                type={'radio'} id={'info-car-false'}
                label={t('info.fields.car.options.false.label')}
                value={t('info.fields.car.options.false.value')}
                selected={this.state.carInsurance === t('info.fields.car.options.false.value')}
                onChange={changeCarInsurance} inline={true}/>
            </div>
            <div className='w-75 mx-auto'>
              <Button size='lg' variant="primary" type="submit" block disabled={{/*!this.state.enableSubmit*/}}>
                {t('info.submit')}
              </Button>
            </div>
          </Form>
        </FormContainer>
        <Container>
          <Row>
            <Col md={{span:6, offset: 3}}>
              <p className="small text-med-dark"><ShieldLogo className='mr-2'/>{t('zip.badgeText')}</p>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withTranslation()(StartInfo);
