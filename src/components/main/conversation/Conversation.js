import React from 'react'
import { useSelector }  from 'react-redux'
import Message  from '../../shared/conversation/Message'


function Conversation({ t, match }) {
  const conversation = useSelector(state => state.conversation)

  return (
    <div className='p-3'>
      <h1>Conversation</h1>
      { conversation.messages.map(message => <Message message={message}/>) }
    </div>
  )
}

export default Conversation;
