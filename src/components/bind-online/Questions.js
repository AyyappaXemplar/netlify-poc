import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormContainer from "../shared/FormContainer";
import TitleRow from "../shared/TitleRow";
import BadgeText from "../shared/BadgeText";

import {updateQuote} from "../../actions/quotes"

const Questions = ({history}) => {
  const questions = useSelector((redux) => redux.data.quote.questions);
  const [questionsState, updateQuestionsState] = useState(questions);
  const updatingQuoteInfo = useSelector(state => state.state.updatingQuoteInfo)
  const [submitted, setSubmitted]       = useState(false)
  const quote = useSelector(state => state.data.quote)
  const dispatch = useDispatch();


  const handleCheckOnChange = (question, event) => {
      updateQuestionsState(prevState => {
        prevState.forEach(q => {
          if (q.question_code === question.question_code) {
            question.value = event.target.value
          }
        })
        return [...prevState]
    });
  };

  const submitQuestions = () => {

    setSubmitted(true)
    dispatch(updateQuote({questions:questionsState}, quote.id))
  }

  useEffect(() => {
    if (submitted && !updatingQuoteInfo) history.push('/bol/quote/review')
  }, [submitted, updatingQuoteInfo, history])

  return (
    <>
      <TitleRow
        title={`Application Questions`}
        subtitle={`Before generating your policy, please review and answer the following questions.`}
      />
      <FormContainer bootstrapProperties={{ md: 6 }}>
        <Form>
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
                        onChange={(event) => {
                          event.persist();
                          handleCheckOnChange(question, event);
                        }}
                        value={true}
                        selected={!!question.value}
                      />
                      <label className="mb-0 ml-2"
                        htmlFor={`question-${question.question_code}-true`}>Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id={`question-${question.question_code}-false`}
                        onChange={(event) => {
                          event.persist();
                          handleCheckOnChange(question, event);
                        }}
                        value={false}
                        selected={!question.value}
                      />
                      <label className="mb-0 ml-2"
                        htmlFor={`question-${question.question_code}-false`}>No</label>
                    </div>
                  </Col>
                </Row>
                {index >= questions.length - 1 ? null : <hr />}
              </div>
            );
          })}
        </Form>
      </FormContainer>
      <Row className="justify-content-center">
        <Col xs={6} className="d-flex row justify-content-center">
          <Button className="rounded-pill col-8 mb-5" onClick={()=>{submitQuestions()}}>Save & Continue</Button>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col xs={6} className="d-flex row justify-content-center">
          <button type="button" className="btn btn-link" >
            Cancel & Return
          </button>
        </Col>
      </Row>
      <BadgeText />
    </>
  );
};

export default Questions;
