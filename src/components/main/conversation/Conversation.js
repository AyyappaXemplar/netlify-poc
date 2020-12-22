import React, { useEffect, useState } from "react";

import MessageInput from "../../shared/conversation/MessageInput";
import ConversationWrapper from "../../main/conversation/ConversationWrapper";
import Messages from "../../shared/conversation/Messages";

const Conversation = () => {
  const [messagInputHeightState, updateMessageInputState] = useState();

  useEffect(() => {
    const messageInputHeight = document.querySelector(".messageInput")
      .offsetHeight;
    updateMessageInputState(messageInputHeight);
    return () => {};
  }, []);

  return (
    <ConversationWrapper>
      <Messages messageInputHeight={messagInputHeightState} />
      <MessageInput />
    </ConversationWrapper>
  );
};
export default Conversation;
