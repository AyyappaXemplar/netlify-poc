import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Form } from "react-bootstrap";
import FormContainer from "../shared/FormContainer";
import TitleRow from "../shared/TitleRow";

const Questions = () => {
  const questions = useSelector((redux) => redux.data.quote.questions);
  console.log(questions);
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
                  <Col xs={12} md={8} className="pr-5">
                    <label>{question.text}</label>
                  </Col>
                  <Col xs={6} md={4} className="d-flex row justify-content-between align-items-center">
                    <div>
                      <input type="radio" name={`question-${question.question_code}`} />
                      <label className="mb-0 ml-2">Yes</label>
                    </div>
                    <div>
                      <input type="radio" name={`question-${question.question_code}`} />
                      <label className="mb-0 ml-2">No</label>
                    </div>
                  </Col>
                </Row>
                { 
                    index >= questions.length -1 ? null : <hr />
                }
              </>
            );
          })}
        </Form>
      </FormContainer>
    </>
  );
};

export default Questions;
