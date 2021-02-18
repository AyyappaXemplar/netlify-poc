import React, { useState, useEffect } from "react";
import { useSelector, useDispatch }   from "react-redux";
import { Container, Row, Col, Form }  from "react-bootstrap";

import SubmitButton  from "../shared/SubmitButton";
import FormContainer from "../shared/FormContainer";
import TitleRow      from "../shared/TitleRow";
import BadgeText     from "../shared/BadgeText";

import {updateQuote} from "../../actions/quotes"

const Questions = ({history}) => {
  const questions = useSelector((redux) => redux.data.quote.questions);
  const [questionsState, updateQuestionsState] = useState(questions);
  const updatingQuoteInfo = useSelector(state => state.state.updatingQuoteInfo)
  const [submitted, setSubmitted]       = useState(false)
  const quote = useSelector(state => state.data.quote)
  const dispatch = useDispatch();


  const handleCheckOnChange = (question_code, value) => {
    updateQuestionsState(prevState => {
      prevState.forEach(q => {
        if (q.question_code === question_code) {
          q.value = value
        }
      })
      return [...prevState]
    });
  };

  const changeExplanation = (question_code, text) => {
    updateQuestionsState(prevState => {
      prevState.forEach(q => {
        if (q.question_code === question_code) {
          q.explanation = text
        }
      })
      return [...prevState]
    });
  };

  function needExplanation(question) {
    return new RegExp(/explain/).test(question.text)
  }

  const submitQuestions = (event) => {
    event.preventDefault()
    setSubmitted(true)
    dispatch(updateQuote({questions:questionsState}, quote.id))
  }

  useEffect(() => {
    if (submitted && !updatingQuoteInfo) history.push('/bol/quotes/review')
  }, [submitted, updatingQuoteInfo, history])

  return (
    <>
      <TitleRow
        title={`Application Questions`}
        subtitle={`Before generating your policy, please review and answer the following questions.`}
      />
      <Form onSubmit={submitQuestions}>
        <FormContainer bootstrapProperties={{ sm: 12, md: 12, lg:6 }}>
          {questionsState.map((question, index) => {
            return (
              <div key={index + 1}>
                <Row className="justify-content-center align-items-center mb-3 boder-bottom-dark">
                  <Col xs={12} md={9} className="pr-5">
                    <label>{question.text}</label>
                  </Col>
                  <Col xs={6} md={3} className="d-flex row justify-content-around align-items-center">
                    <div>
                      <input
                        type="radio"
                        id={`question-${question.question_code}-true`}
                        onChange={() => handleCheckOnChange(question.question_code, true)}
                        value={true}
                        checked={question.value}
                      />
                      <label className="mb-0 ml-2"
                        htmlFor={`question-${question.question_code}-true`}>Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id={`question-${question.question_code}-false`}
                        onChange={() => handleCheckOnChange(question.question_code, false)}
                        value={false}
                        checked={question.value === false}
                      />
                      <label className="mb-0 ml-2"
                        htmlFor={`question-${question.question_code}-false`}>No</label>
                    </div>
                  </Col>
                </Row>
                { question.value && needExplanation(question) &&

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

        <Row className="mb-5">
          <Col md={{ span: 8, offset: 2 }}>
            <div className='w-100 mx-auto'>
              <SubmitButton text='Save and Continue'/>
            </div>
          </Col>
        </Row>
        </Container>
      </Form>




      <Row className="justify-content-center mb-5">
        <Col xs={6} className="d-flex row justify-content-center">
          <button type="button" className="btn btn-link text-info" >
            Cancel & Return
          </button>
        </Col>
      </Row>
      <BadgeText />
    </>
  );
};

export default Questions;
