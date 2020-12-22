import React from 'react'
import { ReactComponent as AdultFemale } from '../../../images/adult-female.svg';
import { ReactComponent as AdultMale }   from '../../../images/adult-male.svg';

function Message({ message }) {
  const icon = message.from === 'bot' ? <AdultMale/> : <AdultFemale/>

  return (
    <div className="p-2">
      { icon }
      <div className='border-bottom border-dark p-3'>
        { message.statements.map((statement, index) =>
          <p key={`statement-${index}`}
             className='rounded bg-dark text-white p-2'>
            {statement}
          </p>
        )}
      </div>
    </div>
  )
}

export default Message;
