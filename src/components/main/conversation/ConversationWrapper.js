import React from "react";
import { Container, Row } from "react-bootstrap";
const ConversationWrapper = (props) => {
  return <Container className={"flex-column"}>{props.children}</Container>;
};

export default ConversationWrapper;
