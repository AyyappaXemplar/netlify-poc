import React from 'react';
import './QuoteItemCard.scss'
import { ReactComponent as PencilIcon } from '../../images/pencil.svg'
import { ReactComponent as TrashIcon } from '../../images/trash.svg'

function QuoteItemCard({ t, icon, title, body, bodyCss, iconBg, onDelete }) {
  return (
    <div className='quote-item-card d-flex align-items-center bg-white rounded p-3 mb-4'>
      <div className={ 'mr-3 ' + iconBg}>{icon}</div>
      <div className='d-flex flex-column flex-grow-1'>
        <div className='title'>{title}</div>
        <div className={bodyCss}>{body}</div>
      </div>
      <div className='actions text-med-light'>
        <PencilIcon className="mr-3"/>
        <TrashIcon onClick={onDelete}/>
      </div>
    </div>
  )
}

export default QuoteItemCard
