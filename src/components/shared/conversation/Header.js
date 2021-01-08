import React from "react";
import { Row, Col, Image } from "react-bootstrap";
const Header = () => {
  return (
    <Row className={"header"}>
      <Col xs={2}></Col>
      <Col className={"header__copy"}>
        <p className="header__copy-name">Anne</p>
        <p className="header__copy-sub">InsureOnline Insurance Assistant</p>
      </Col>
      <Col xs={2}>
        <Image />
      </Col>
    </Row>
  );
};

export default Header;
