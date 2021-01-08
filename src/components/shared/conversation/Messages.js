import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Message from "../../shared/conversation/Message";

const Messages = (props) => {
  const conversation = useSelector((state) => state.conversation);
  const [clientHeightState, updateClientHeight] = useState(0);
  const [messageInputHeight, updateMessageInputHeight] = useState();

  const renderMessage = (inputHeight) => {
    return (
      <Row
        noGutters={true}
        style={{ height: clientHeightState - inputHeight }}
        className="messages"
      >
        <Col>
          {conversation.messages.map((message, i) => (
            <Message message={message} key={i + 1} />
          ))}
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    const clientHeight = window.innerHeight;
    updateClientHeight(clientHeight);
    return () => {};
  }, []);

  return (() => {
    if (props.messageInputHeight !== undefined) {
      return renderMessage(props.messageInputHeight);
    } else {
      return "";
    }
  })(props);
};

export default Messages;
