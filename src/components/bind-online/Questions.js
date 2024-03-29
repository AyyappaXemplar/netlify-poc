import React, { useState, useEffect } from "react";
import { useSelector, useDispatch }   from "react-redux";
import { Container, Row, Col, Form, Button, Image, Popover, OverlayTrigger }  from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import SubmitButton  from "../shared/SubmitButton";
import FormContainer from "../shared/FormContainer";
import TitleRow      from "../shared/TitleRow";
import BadgeText     from "../shared/BadgeText";
import FormAlert     from "../shared/FormAlert";
import { updateQuote }    from "../../actions/quotes"
import validateQuestions  from "../../validators/bind-online/QuestionsForm"
import infoLogo from "../../images/Info-2.svg"
import DeliveryTncModal from "./DeliveryTncModal"
import { Helmet } from 'react-helmet'
import mixpanel from "../../config/mixpanel"
import isMonitoredDriverProgram from "../../services/isMonitoredDriverProgram";

const Questions = ({history, t}) => {

  useEffect(() => mixpanel.track("Pageview", {
    "Page Title": "Yes/No Application Questions",
    "Section": "Bind Online"
  }), [])

  const quote                       = useSelector(state => state.data.quote)
  const updatingQuoteInfo           = useSelector(state => state.state.updatingQuoteInfo);
  const QUESTION_EXCLUSION_STRING   = "Contents PLUS";
  const QUESTION_EXCLUSION_TNC      = "TNC";
  const QUESTION_EXCLUSION_DELIVERY = ["livery conveyance pertaining", "Individual Delivery Coverage Endorsement"];
  const QUESTION_EXCLUSION_MONITORED = ["monitoring", "monitor"]
  const vehicles                    = useSelector(state => state.data.quote.vehicles);
  const [showDeliveryTncModal, setShowDeliveryTncModal] = useState(false)

  const isTnc = () => { return vehicles.some(vehicle => vehicle.tnc === true) }
  const isDelivery = () => { return vehicles.some(vehicle => vehicle.individual_delivery === true) }
  const checkForContentsPlusText = text => text.includes(QUESTION_EXCLUSION_STRING) ? true : false;
  const checkForTncText = text => text.includes(QUESTION_EXCLUSION_TNC) ? true : false;
  const checkForDeliveryText = text => text.includes(QUESTION_EXCLUSION_DELIVERY[0]) ? true : false || text.includes(QUESTION_EXCLUSION_DELIVERY[1]) ? true : false
  const checkForMonitoredText = text => text.includes(QUESTION_EXCLUSION_MONITORED[0]) || text.includes(QUESTION_EXCLUSION_MONITORED[1]) ? true : false

  const [questions, setQuestions] = useState(quote.questions.map(question => {
    let value = process.env.NODE_ENV === 'development' ? false : '';

    if (checkForContentsPlusText(question.text)) question.disabled = true
    if (checkForContentsPlusText(question.text)) { value = false }
    (checkForMonitoredText(question.text) && isMonitoredDriverProgram(quote.selected_rate)) && (() => {
      question.disabled = true
      value = true
    })()

    return ({ ...question, value });
  }))

  const [submitted, setSubmitted]   = useState(false)
  const [errors, setErrors]         = useState([])
  const dispatch                    = useDispatch();

  const handleOnChange = (question_code, value) => {
    setQuestions(questions => {
      questions.forEach(q => {
        if (q.question_code === question_code) {
          q.value = value

          // If vehicle is TNC or Delivery and that does not match question value
          // render a modal explaining the quesiton value does not match vehicle value.
          if (q.value === false && isDelivery() && checkForDeliveryText(q.text)) {
            q.value = ''
            setShowDeliveryTncModal(true)
          } else if(q.value === true && !isDelivery() && checkForDeliveryText(q.text)) {
            q.value = ''
            setShowDeliveryTncModal(true)
          } else if(q.value === false && isTnc() && checkForTncText(q.text)) {
            q.value = ''
            setShowDeliveryTncModal(true)
          } else if (q.value === true && !isTnc() && checkForTncText(q.text)){
            q.value = ''
            setShowDeliveryTncModal(true)
          }
        }
      })

      return [...questions]
    })
  };

  const changeExplanation = (question_code, text) => {
    setQuestions(prevState => {
      prevState.forEach(q => {
        if (q.question_code === question_code) {
          q.explanation = text
        }
      })
      return [...prevState]
    });
  };

  const submitQuestions = (event) => {
    event.preventDefault()
    const payload = { ...quote, questions }
    const validationErrors = validateQuestions(payload)

    if (validationErrors) {
      setErrors(err => Object.values(validationErrors).flat())
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setSubmitted(true)
      dispatch(updateQuote(payload, quote.id))
      setErrors([])
    }
  }

  useEffect(() => {
    if (submitted && !updatingQuoteInfo) history.push('/bol/quotes/review')
  }, [submitted, updatingQuoteInfo, history])

  const popover = (
    <Popover className="border-0 shadow-lg bg-white rounded" >
      <Popover.Content className="my-2">
        {t("contentPlus.copy")}
      </Popover.Content>
    </Popover>
  )

  const handleCancel = () => {
    history.push('/bol/coverages');
  }

  return (
    <Container className="pt-base">
      <Helmet>
        <title>Application questions | InsureOnline.com</title>
      </Helmet>
      <TitleRow
        title={t("applicationQuestions.title")}
        subtitle={t("applicationQuestions.subtitle")}
      />
      <Row>
        <Col md={{ span: 6, offset: 3}}>
          { !!errors.length && errors.map((err, index) =>
            <FormAlert key={`error-${index}`} text={err}/>
          )}
        </Col>
      </Row>
      <Form onSubmit={submitQuestions}>
        <FormContainer bootstrapProperties={{ md:8 }}>
          {questions.map((question, index) => {

            return (
              <div key={index + 1} >
                <Row className="justify-content-center mb-3 boder-bottom-dark">
                  <Col className={'h-100 col-1 p-0'}>{question.question_number}.</Col>
                  <Col md={8} className={`pl-0 `}>
                    <label>{question.text} { question.disabled && <OverlayTrigger
                        trigger={['hover', 'focus']}
                        key="top"
                        placement="top"
                        overlay={popover}
                      >
                        <Image className="d-inline rounded-circle ml-1" src={infoLogo} alt="info logo" style={{ width: "14px", height: "14px" }}/>
                      </OverlayTrigger>
                    }</label>
                  </Col>

                  <Col md={3} className="d-flex row justify-content-around align-items-center">

                    <label className="mb-0 d-flex align-items-center justify-content-center p-3"
                        htmlFor={`question-${question.question_code}-true`}>
                      <input
                        className="mr-2"
                        type="radio"
                        id={`question-${question.question_code}-true`}
                        onChange={() => handleOnChange(question.question_code, true)}
                        value={true}
                        checked={question.value}
                        disabled={question.disabled}
                      />
                      Yes
                    </label>


                    <label className="mb-0 d-flex align-items-center justify-content-center p-3"
                        htmlFor={`question-${question.question_code}-false`}>
                      <input
                        className="mr-1"
                        type="radio"
                        id={`question-${question.question_code}-false`}
                        onChange={() => handleOnChange(question.question_code, false)}
                        value={false}
                        checked={question.value === false}
                        disabled={question.disabled}
                      />
                      No
                    </label>
                  </Col>
                </Row>
                { (question.value && !checkForMonitoredText(question.text) && !isMonitoredDriverProgram(quote.selected_rate)) &&
                  <Row>
                    <Col>
                      <Form.Control type="textarea"
                        value={question.explanation}
                        onChange={(event) => changeExplanation(question.question_code, event.target.value)}
                      />
                    </Col>
                  </Row>
                }
                { index >= questions.length - 1 ? null : <hr /> }
              </div>
            );
          })}
        </FormContainer>
        <Container>
        <Row className="mb-5 justify-content-center">
          <Col md={{ span: 5 }}>
            <div className='w-100 mx-auto'>
              <SubmitButton text={t("saveAndContinue")}/>
            </div>
          </Col>
        </Row>
        </Container>
      </Form>
      <Row className="justify-content-center mb-5">
        <Col xs={6} className="d-flex row justify-content-center">
          <Button onClick={handleCancel} variant="link" className="text-med-dark text-decoration-none" >
            {t("cancelAndReturn")}
          </Button>
        </Col>
      </Row>
      <BadgeText />

      <DeliveryTncModal
        showDeliveryTncModal={showDeliveryTncModal}
        setShowDeliveryTncModal={setShowDeliveryTncModal}
        history={history}
      />
    </Container>
  );
};

export default withTranslation(["common"])(Questions);
