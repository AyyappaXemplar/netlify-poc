import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image, Container } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import violationsData from "../../../data/violationsDesc";
import violationsTypes from "../../../data/incidentsOptions";
import getDate from "../../../services/timestamps";

import Icon from "../../../images/icon-accident.svg";

const ViolationsCard = ({ t, violation }) => {
  const [violationFilteredData, updateViolationFilteredData] = useState({
    text: "",
    type: "",
    date: violation.date,
  });

  const renderCard = () => {
    return (
      <Card className={"violationsCard mb-2"}>
        <Container>
          <Row>
            <Col xs={2} className="d-flex justify-content-center flex-column">
              <Image src={Icon} className="align-middle" />
            </Col>
            <Col className="d-flex flex-column violationsCard__content col-md-10">
              <strong>{violationFilteredData.type}</strong>{" "}
              <span>
                {getDate(violationFilteredData.date)}
                {" - "}
                {violationFilteredData.text}
              </span>
            </Col>
            <Col xs={2}></Col>
          </Row>
        </Container>
      </Card>
    );
  };

  useEffect(() => {
    const violationText = violationsData.filter((violationItem) => {
      if (violationItem.value === violation.description) {
        return violationItem;
      } else {
        return false;
      }
    });

    const incidentType = violationsTypes.filter((type) => {
      if (type.key === violation.type) {
        return type;
      } else {
        return false;
      }
    });

    updateViolationFilteredData((prevstate) => {
      let newViolation = { ...prevstate };
      newViolation.text = violationText[0].label;
      newViolation.type = incidentType[0].label;

      return newViolation;
    });
  }, [violation]);

  return violationFilteredData.text !== undefined ? renderCard() : "";
};
export default withTranslation(["drivers"])(ViolationsCard);
