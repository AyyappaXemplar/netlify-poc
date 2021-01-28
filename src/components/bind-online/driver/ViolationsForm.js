import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CustomSelect from "../../forms/CustomSelect";
import FormContainer from "../../shared/FormContainer";
import { withTranslation } from "react-i18next";
import getDate, { getTimestamp } from "../../../services/timestamps";

import violationsDesc from '../../../data/violationsDesc'

const ViolationsForm = ({ driver, updateParentState, displayForm }) => {

  const [violationsData, updateViolationsData] = useState(violationsDesc);

  const filterDescriptions = (array, key) => { 
      const reducedArray = array.filter((item) => { 
        if (item.data !== undefined && item.data === key) { 
          return item
        }
      })
    
    return reducedArray
  }

  const incidentsOptions = [
    {
      label: "Accident",
      value: "Accident",
      key: "10",
    },
    {
      label: "Disobeying, Fleeing, Eluding",
      value: "Disobeying, Fleeing, Eluding",
      key: "18",
    },
    {
      label: "Expiration",
      value: "Expiration",
      key: "11",
    },
    {
      label: "Intermediate",
      value: "Intermediate",
      key: "29",
    },
    {
      label: "License, Registration, Insurance",
      value: "License, Registration, Insurance",
      key: "13",
    },
    {
      label: "Major",
      value: "Major",
      key: "16",
    },
    {
      label: "Minor",
      value: "Minor",
      key: "24",
    },
    {
      label: "Narcotics/Alcohol",
      value: "Narcotics/Alcohol",
      key: "14",
    },
    {
      label: "No Charge",
      value: "No Charge",
      key: "25",
    },
    ,
    {
      label: "Safety Restraints",
      value: "Safety Restraints",
      key: "22",
    }
    ,
    {
      label: "Speed",
      value: "Speed",
      key: "19",
    },
    {
      label: "Suspensions",
      value: "Suspensions",
      key: "12",
    },
    {
      label: "Turn, Stop, Yield Right Of Way",
      value: "Turn, Stop, Yield Right Of Way",
      key: "21",
    },
  ];



  return (
    <div style={{ display: displayForm ? "block" : "none" }}>
      <p>What is the date of the incident?</p>
      <Row className={"mb-3 "}>
        <Col>
          <input
            type="date"
            // TO DO: wire this up properly
            value={getDate(driver.license_issued_at)}
            onChange={(event) => {
              let timestamp = getTimestamp(event.target.value);
              return false;
            }}
          />
        </Col>
      </Row>
      <Row className={"mb-3"}>
        <Col>
          <p>What type of incident?</p>
          <CustomSelect
            options={incidentsOptions}
            onChange={(e) => {
              updateViolationsData(filterDescriptions(violationsDesc, e[0].key))  
            }}
            values={[{ label: "none", value: "none" }]}
          />
        </Col>
      </Row>
      <Row className={"mb-3"}>
        <Col>
          <p>Incident description</p>
          <CustomSelect
            options={violationsData}
            onChange={(e) => {
              return false;
            }}
            values={[{ label: "none", value: "none" }]}
          />
        </Col>
      </Row>

      <Row>
        <Col className={"d-flex justify-content-between"}>
          <a href="#">Cancel</a>
          <Button>Add Incident</Button>
        </Col>
      </Row>
    </div>
  );
};

export default withTranslation(["drivers"])(ViolationsForm);
