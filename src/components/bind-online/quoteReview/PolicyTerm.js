import React                   from "react";
import { Row, Col } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import getDate from "../../../services/timestamps";

export default withTranslation(["rates"])(function DriverDetailsReview({quote, t}) {

  return (
    <Row>
      <Col>
        <div className='bg-white rounded shadow-sm mb-5 p-4 d-flex justify-content-between'>
          <div className='w-50'>
            <p>
              <strong>{t("policyTerm")}</strong> 
            </p>
            <p className="mb-0">{quote.term.duration} {t("months")}</p>
          </div>
          <div className='w-50'>
            <p>
              <strong>{t("effectiveDates")}</strong>
            </p>
            <p className="mb-0">{getDate(quote.term.effective, 'MM/DD/YYYY')} - {getDate(quote.term.expires, 'MM/DD/YYYY')}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
})
