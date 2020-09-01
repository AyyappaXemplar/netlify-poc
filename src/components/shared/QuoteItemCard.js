import React from 'react';
import './QuoteItemCard.scss'

function QuoteItemCard({ t, icon, title, body, bodyCss, iconBg }) {
  return (
    <div className='quote-item-card d-flex align-items-center bg-white shadow-sm rounded p-3 mb-4'>
      <div className={ 'mr-3 ' + iconBg}>{icon}</div>
      <div className='d-flex flex-column'>
        <div className='title'>{title}</div>
        <div className={bodyCss}>{body}</div>
      </div>
    </div>
  )
}

export default QuoteItemCard
