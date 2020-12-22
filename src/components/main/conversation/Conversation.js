import React from 'react'
import { useSelector }  from 'react-redux'
import Message  from '../../shared/conversation/Message'


function Conversation({ t, match }) {
  const conversation = useSelector(state => state.conversation)

  return (
    <div className='p-3'>
      { conversation.messages.map((message, index) => <Message key={`message-${index}`} message={message}/>) }
    </div>
  )
}

export default Conversation;
