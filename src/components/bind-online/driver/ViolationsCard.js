import React                     from "react";
import { Row, Col, Card, Image } from "react-bootstrap";
import { withTranslation }       from "react-i18next";

import getDate           from "../../../services/timestamps";
import allViolations     from "../../../data/violationsDesc";
import violationOptions from "../../../data/incidentsOptions";

import accidentIcon from "../../../images/icon-accident.svg";
import trashIcon from "../../../images/trash.svg";

const ViolationsCard = ({ t, violation, deleteViolation, updateShowViolationsForm, index }) => {
  const onDeleteViolation = () => {
    deleteViolation(violation, index)
  }

  const violationObj = allViolations.find(item => item.type === violation.type) || {}
  const violationType = violationOptions.find(item => item.key === violationObj.data)?.label

  return (
    <Card className={"violationsCard mb-2 border-0 p-3"}>
        <Row>
          <Col className="d-flex justify-content-center flex-column col-sm-12 col-md-2">
            <Image width="50px" height="38px" className={"violationsCard__accidentIcon align-middle"} src={accidentIcon} />
          </Col>
          <Col className="d-flex flex-column violationsCard__content col-sm-12 col-md-8">
            <strong>{violationObj.label}</strong>
            <span>
              {`${getDate(violation.date)} - ${violationType}`}
            </span>
          </Col>
          <Col className={"d-flex flex-row justify-content-between align-items-center col-sm-12 col-md-2"}>
          <Image width="18px" height="18px" onClick={onDeleteViolation} src={trashIcon}/>
          </Col>
        </Row>
    </Card>
  );
};
export default withTranslation(["drivers"])(ViolationsCard);
