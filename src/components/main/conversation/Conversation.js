import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Message from "../../shared/conversation/Message";
import MessageInput from "../../shared/conversation/MessageInput";
import ConversationWrapper from "../../main/conversation/ConversationWrapper";
const Conversation = ({ t, match }) => {
  const conversation = useSelector((state) => state.conversation);

  return (
    <ConversationWrapper>
      <Row noGutters={true}>
        <Col>
          {conversation.messages.map((message) => (
            <Message message={message} />
          ))}
        </Col>
      </Row>
      <MessageInput />
    </ConversationWrapper>
  );
};
export default Conversation;
