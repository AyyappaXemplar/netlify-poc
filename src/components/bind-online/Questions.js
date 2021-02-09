import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormContainer from "../shared/FormContainer";
import TitleRow from "../shared/TitleRow";
import BadgeText from "../shared/BadgeText";

const Questions = () => {
  const questions = useSelector((redux) => redux.data.quote.questions);
  // const [questionsState, updateQuestionsState] = useState(questions);

  const handleCheckOnChange = (question) => {};

  return (
    <>
      <TitleRow
        title={`Application Questions`}
        subtitle={`Before generating your policy, please review and answer the following questions.`}
      />
      <FormContainer bootstrapProperties={{ md: 6 }}>
        <Form>
          {questions.map((question, index) => {
            return (
              <>
                <Row className="justify-content-center align-items-center mb-3 boder-bottom-dark">
                  <Col xs={12} md={9} className="pr-5">
                    <label>{question.text}</label>
                  </Col>
                  <Col
                    xs={6}
                    md={3}
                    className="d-flex row justify-content-around align-items-center"
                  >
                    <div>
                      <input
                        type="radio"
                        name={`question-${question.question_code}`}
                        onChange={(e) => {
                          handleCheckOnChange(question, e);
                        }}
                      />
                      <label className="mb-0 ml-2" value={true}>
                        Yes
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name={`question-${question.question_code}`}
                        onChange={(e) => {
                          handleCheckOnChange(question, e);
                        }}
                      />
                      <label className="mb-0 ml-2" value={false}>
                        No
                      </label>
                    </div>
                  </Col>
                </Row>
                {index >= questions.length - 1 ? null : <hr />}
              </>
            );
          })}
        </Form>
      </FormContainer>
      <Row className="justify-content-center">
        <Col xs={6} className="d-flex row justify-content-center">
          <Button className="rounded-pill col-8 mb-5">Save & Continue</Button>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col xs={6} className="d-flex row justify-content-center">
          <button type="button" class="btn btn-link">
            Cancel & Return
          </button>
        </Col>
          </Row>
          <BadgeText />
    </>
  );
};

export default Questions;
