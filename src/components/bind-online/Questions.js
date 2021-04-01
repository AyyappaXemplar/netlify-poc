import React, { useState, useEffect } from "react";
import { useSelector, useDispatch }   from "react-redux";
import { Container, Row, Col, Form, Button }  from "react-bootstrap";

import SubmitButton  from "../shared/SubmitButton";
import FormContainer from "../shared/FormContainer";
import TitleRow      from "../shared/TitleRow";
import BadgeText     from "../shared/BadgeText";
import FormAlert     from "../shared/FormAlert";

import { updateQuote }    from "../../actions/quotes"
import validateQuestions  from "../../validators/bind-online/QuestionsForm"

const Questions = ({history}) => {
  const quote = useSelector(state => state.data.quote)
  const updatingQuoteInfo = useSelector(state => state.state.updatingQuoteInfo)
  const [questions, setQuestions] = useState(quote.questions.map(question => {

    const QUESTION_RESTRICTION = 1812;
    const isTncQuestion = () => parseInt(question.question_code) >= QUESTION_RESTRICTION;
    const value = process.env.NODE_ENV === 'development' || isTncQuestion() ? false : ''

    if (isTncQuestion()) question['hidden'] = true;

    return ({ ...question, value });

  }))

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]         = useState([])
  const dispatch = useDispatch();

  const handleCheckOnChange = (question_code, value) => {
    setQuestions(prevState => {
      prevState.forEach(q => {
        if (q.question_code === question_code) {
          q.value = value
        }
      })
      return [...prevState]
    });
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

  return (
    <Container className="pt-base">
      <TitleRow
        title={`Application Questions`}
        subtitle={`Before generating your policy, please review and answer the following questions.`}
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
              <div key={index + 1} className={question.hidden ? 'hide' : null}>
                <Row className="justify-content-center mb-3 boder-bottom-dark">
                  <Col className={'h-100 col-1 p-0'}>{question.question_number}.</Col>
                  
                  <Col md={8} className="pl-0">
                    <label>{question.text}</label>
                  </Col>

                  <Col md={3} className="d-flex row justify-content-around align-items-center">
                    
                    <label className="mb-0 d-flex align-items-center justify-content-center p-3"
                        htmlFor={`question-${question.question_code}-true`}>
                      <input
                        className="mr-2"
                        type="radio"
                        id={`question-${question.question_code}-true`}
                        onChange={() => handleCheckOnChange(question.question_code, true)}
                        value={true}
                        checked={question.value}
                      />
                      Yes
                    </label>


                    <label className="mb-0 d-flex align-items-center justify-content-center p-3"
                        htmlFor={`question-${question.question_code}-false`}>
                      <input
                        className="mr-1"
                        type="radio"
                        id={`question-${question.question_code}-false`}
                        onChange={() => handleCheckOnChange(question.question_code, false)}
                        value={false}
                        checked={question.value === false}
                      />
                      No
                    </label>

                  </Col>
                </Row>
                { question.value &&

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
              <SubmitButton text='Save and Continue'/>
            </div>
          </Col>
        </Row>
        </Container>
      </Form>




      <Row className="justify-content-center mb-5">
        <Col xs={6} className="d-flex row justify-content-center">
          <Button variant="link" className="text-med-dark text-decoration-none" >
            Cancel & Return
          </Button>
        </Col>
      </Row>
      <BadgeText />
    </Container>
  );
};

export default Questions;
