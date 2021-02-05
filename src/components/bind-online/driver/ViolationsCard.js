import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import violationsData from "../../../data/violationsDesc";
import violationsTypes from "../../../data/incidentsOptions";
import getDate from "../../../services/timestamps";

import accidentIcon from "../../../images/icon-accident.svg";
import pencilIcon from "../../../images/pencil.svg";
import trashIcon from "../../../images/trash.svg";



const ViolationsCard = ({ t, violation }) => {
  const [violationFilteredData, updateViolationFilteredData] = useState({
    text: "",
    type: "",
    date: violation.date,
  });

  const renderCard = () => {
    return (
      <Card className={"violationsCard mb-2 border-0 p-3"}>
          <Row>
            <Col className="d-flex justify-content-center flex-column col-sm-12 col-md-2">
              <Image width="50px" height="38px" className={"violationsCard__accidentIcon align-middle"} src={accidentIcon} />
            </Col>
            <Col className="d-flex flex-column violationsCard__content col-sm-12 col-md-8">
              <strong>{violationFilteredData.type}</strong>{" "}
              <span>
                {getDate(violationFilteredData.date)}
                {" - "}
                {violationFilteredData.text}
              </span>
            </Col>
            <Col className={"d-flex flex-row justify-content-between align-items-center col-sm-12 col-md-2"}>
              <Image width="18px" height="18px" src={pencilIcon}/>
              <Image  width="18px" height="18px" src={trashIcon}/>
            </Col>
          </Row>
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
