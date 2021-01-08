import React from "react";
import { ReactComponent as AdultFemale } from "../../../images/adult-female.svg";
import { ReactComponent as AdultMale } from "../../../images/avatar.svg";
import { Row, Col } from "react-bootstrap";

function Message({ message }) {
  const icon =
    message.from === "bot" ? (
      <AdultMale width="28px" height="28px" />
    ) : (
      <AdultFemale width="28px" height="28px" />
    );

  return (
    <Row
      className={`p-2 messanger ${
        message.from === "user" ? "messanger__user" : null
      }`}
    >
      <Col xs={2}>{icon}</Col>

      <Col xs={8}>
        {message.statements.map((statement, i) => (
          <p className="messanger__message" key={i + 1}>
            {statement}
          </p>
        ))}
      </Col>
    </Row>
  );
}

export default Message;
