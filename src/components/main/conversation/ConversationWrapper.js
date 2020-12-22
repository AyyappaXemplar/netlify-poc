import React from "react";
import { Container } from "react-bootstrap";
const ConversationWrapper = (props) => {
  return <Container className={"flex-column"}>{props.children}</Container>;
};

export default ConversationWrapper;
