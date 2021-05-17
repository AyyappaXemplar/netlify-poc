import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PolicyTerm from "./PolicyTerm";

export default withTranslation(["quotes"])(function DriverDetailsReview({ quote, t }) {
  const driver = quote.drivers.find(driver => driver.policyholder)
  const emailPreferred = driver.communication_preference==='email'
  const phonePreferred = driver.communication_preference==='phone'
  const { address } = driver
  const addressDisplay = `${address.line1} ${address.line2 ? address.line2 : ""}`
  const cityStateDisplay = `${address.city}, ${address.state} ${address.zip_code}`

  return (
    <>
      <label>{t("details")}</label>
      <Link className="text-primary float-right" to="/bol/policy-details/edit">
        {t("bolQuotesReview.edit")}
      </Link>
      <div className="bg-white rounded shadow-sm mb-3 p-4">
        <Row>
          <Col>
            <p>
              <strong>{t("bolQuotesReview.policyHolder")}</strong>
            </p>
          </Col>
          <Col>
            <p>
              <strong>{t("bolQuotesReview.address")}</strong>
            </p>
          </Col>
        </Row>
        <Row >
          <Col>
            <p>
              {driver.first_name} {driver.last_name}
            </p>
          </Col>
          <Col>
            <p className="mb-3">
              {addressDisplay}
              <br />
              {cityStateDisplay}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <strong>{t("bolQuotesReview.email")}</strong>
            </p>
          </Col>
          <Col>
          <strong>{t("bolQuotesReview.phone")} {phonePreferred && t("bolQuotesReview.preferredContact")}</strong>
          </Col>
        </Row>
        <Row>
          <Col><p className="mb-0">{driver.email} {phonePreferred &&  t("bolQuotesReview.preferredContact")}</p></Col>
          <Col><p className="mb-0">{driver.phone} {emailPreferred &&  t("bolQuotesReview.preferredContact")}</p></Col>
        </Row>
      </div>
      <PolicyTerm quote={quote} />
    </>
  );
}
)