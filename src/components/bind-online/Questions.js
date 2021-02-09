import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
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
          {/* <Row className="justify-content-center align-items-center mb-3 boder-bottom-dark">
            <Col xs={8}>
              <label>lorem</label>
            </Col>
            <Col xs={4} className="d-flex row justify-content-between align-items-center">
              <div>
                <input type="radio" name="question"/>
                <label className="mb-0 ml-2">Yes</label>
              </div>
              <div>
                <input type="radio" name="question"/>
                <label className="mb-0 ml-2">No</label>
              </div>
            </Col>
          </Row> */}
          {questions.map((question, index) => {
            return (
              <>
                <Row className="justify-content-center align-items-center mb-3 boder-bottom-dark">
                  <Col xs={12} md={8} className="pr-5">
                    <label>{question.text}</label>
                  </Col>
                  <Col
                    xs={6}
                    md={4}
                    className="d-flex row justify-content-between align-items-center"
                  >
                    <div>
                      <input
                        type="radio"
                        name={`question-${question.question_code}`}
                      />
                      <label className="mb-0 ml-2">Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name={`question-${question.question_code}`}
                      />
                      <label className="mb-0 ml-2">No</label>
                    </div>
                  </Col>
                </Row>
                <hr />
              </>
            );
          })}
        </Form>
      </FormContainer>
    </>
  );
};

export default Questions;
