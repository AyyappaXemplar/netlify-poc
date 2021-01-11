import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "./Message";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
gsap.registerPlugin(ScrollToPlugin);

function Conversation({ t, match }) {
  const conversation = useSelector((state) => state.conversation);
  const MESSAGE_CONT_CLASSSNAME = "messagecontainer";
  const clientHeight = window.innerHeight;
  const [convos, updateConvos] = useState(3);
  const [uiHeisghtState, updateUiHeightState] = useState(0);
  const [headerHeight, updateHeaderHeight] = useState(0);
  const padding = 15;


  const scrollWindow = () => {
    gsap.to([".messagecontainer"], 1, {
      scrollTo: clientHeight,
    });
  };

  useEffect(() => {
    const uiDiv = document.querySelector(".uiContainer");
    const headerDiv = document.querySelector(".header");

    if (uiDiv !== null) {
      const dh = uiDiv.offsetHeight;
      updateUiHeightState(dh);
    }
    if (headerDiv !== null) {
      const hh = headerDiv.offsetHeight;
      updateHeaderHeight(hh);
    }
    if (conversation.messages.length >= convos) {
      scrollWindow();
      updateConvos(conversation.messages.length);
    }
  }, [conversation, convos, scrollWindow]);

  return (
    <Container
      className={MESSAGE_CONT_CLASSSNAME}
      style={{ height: clientHeight - uiHeisghtState - headerHeight- padding }}
    >
      {conversation.messages.map((message, index) => (
        <Message
          key={`message-${index}`}
          message={message}
          className={"message"}
        />
      ))}
    </Container>
  );
}

export default Conversation;
