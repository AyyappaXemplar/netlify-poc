import React from "react";
import { Link } from "react-router-dom";
import { Row, Image, Col } from "react-bootstrap";
import logo from "../../../images/logo.svg";
import featureImage from "../../../images/feature.svg";
import "../../../styles/conversational/modules/_splashIntro.scss";

const ConversationSplashIntros = () => {
  const greetingCopy = "Hi, I’m Anne";
  const subcopy = "I’ll get you a personal InsureOnline quote in no time.";

  return (
    <Row className={"justify-content-center splashIntro"}>
      <Col className={"flex justify-content-center splashIntro__logo"} xs={12}>
        {" "}
        <Image
          src={logo}
          width="137px"
          height="32px"
          className={"splashIntro__logo"}
        />
      </Col>
      <Col
        className={"flex justify-content-center splashIntro__feature"}
        xs={12}
      >
        <Image
          src={featureImage}
          width="302px"
          height="255px"
          className={"splashIntro__logo"}
        />
      </Col>
      <Col className={"no-flex splashIntro__headline"} xs={10}>
        <h1>
          <strong>{greetingCopy}</strong>
        </h1>
        <h2>{subcopy}</h2>
      </Col>
      <Col xs={12} className={"flex justify-content-center"}>
        <Link
          onClick={() => {}}
          className="rounded-pill btn btn-primary btn-block btn-lg splashIntro__button"
          type="submit"
          size={"md"}
          to={"/conversation/quotes/new"}
        >
          Get Started
        </Link>
      </Col>
    </Row>
  );
};
export default ConversationSplashIntros;
