import React, { useState } from "react";
import { Row, Col, FormControl, InputGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMessage } from "../../../actions/messages";
export default function MessageInput() {
  const [messageState, updateMessageState] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    updateMessageState(e.target.value);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    dispatch(addMessage("user", [messageState]));
  };

  return (
    <Row noGutters={true}>
      <Col>
        <InputGroup className="mb-3 no-gutters">
          <FormControl
            placeholder="message"
            aria-label="message"
            aria-describedby="message-field"
            onChange={handleInputChange}
          />

          <Button id="basic-addon2" onClick={handleMessageSend}>
            go
          </Button>
        </InputGroup>
      </Col>
    </Row>
  );
}
