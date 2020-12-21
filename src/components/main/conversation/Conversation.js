import React from 'react'
import { useSelector }  from 'react-redux'


function Conversation({ t, match }) {
  const conversation = useSelector(state => state.conversation)

  return (
    <div className='p-3'>
      <h1>Conversation</h1>
      {
        conversation.messages.map(message =>
          <div className='border-bottom border-dark p-3'>
            <p><b>From:</b> {message.from}</p>
            { message.messages.map(mes =>
              <p><b>Message:</b> {mes}</p>
            )}
          </div>
        )
      }
    </div>
  )
}

export default Conversation;
