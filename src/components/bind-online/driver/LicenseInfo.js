import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import CustomSelect from "../../../components/forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import Radio from "../../forms/Radio";
import { withTranslation } from "react-i18next";
const LicenseInfo = ({ t }) => {
  const licenseStatus = [
    {
      label: "Active",
      value: "Active",
      index: 1,
    },
    {
      label: "suspended",
      value: "suspended",
      index: 2,
    },
  ];

  return (
    <Container>
      <FormContainer bootstrapProperties={{ md: 6 }}>
        <Row>
          <Col>
            <h1>License Info</h1>
            <br />
            <strong>Is your license foreign or internation?</strong>
            <div className="mb-3 d-flex flex-sm-row flex-column">
              <Radio
                //   type={"radio"}
                //   id={`info-home-${item.value}`}
                  label={"Yes"}
                //   value={item.value}
                //   key={index}
                //   selected={homeowner === item.value}
                //   onChange={() => setHomeowner(item.value)}
                inline={true}
              />
              <Radio
                //   type={"radio"}
                //   id={`info-home-${item.value}`}
                  label={"No"}
                //   value={item.value}
                //   key={index}
                //   selected={homeowner === item.value}
                //   onChange={() => setHomeowner(item.value)}
                inline={true}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <strong>License status</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomSelect options={licenseStatus} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>License Number</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control placeholder="A123-" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>License state</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control placeholder="Chicago" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>License Date issued</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control placeholder="01/01/2021" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <strong>Do you require SR-22</strong>
            <div className="mb-3 d-flex flex-sm-row flex-column">
              <Radio
                //   type={"radio"}
                //   id={`info-home-${item.value}`}
                  label={"Yes"}
                //   value={item.value}
                //   key={index}
                //   selected={homeowner === item.value}
                //   onChange={() => setHomeowner(item.value)}
                inline={true}
              />
              <Radio
                //   type={"radio"}
                //   id={`info-home-${item.value}`}
                  label={"No"}
                //   value={item.value}
                //   key={index}
                //   selected={homeowner === item.value}
                //   onChange={() => setHomeowner(item.value)}
                inline={true}
              />
            </div>
          </Col>
              </Row>
              <Row>
          <Col>
            <strong>Any violations within the past 3 years?</strong>
            <div className="mb-3 d-flex flex-sm-row flex-column">
              <Radio
                //   type={"radio"}
                //   id={`info-home-${item.value}`}
                  label={"Yes"}
                //   value={item.value}
                //   key={index}
                //   selected={homeowner === item.value}
                //   onChange={() => setHomeowner(item.value)}
                inline={true}
              />
              <Radio
                //   type={"radio"}
                //   id={`info-home-${item.value}`}
                  label={"No"}
                //   value={item.value}
                //   key={index}
                //   selected={homeowner === item.value}
                //   onChange={() => setHomeowner(item.value)}
                inline={true}
              />
            </div>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
};

export default withTranslation(["divers"])(LicenseInfo);
