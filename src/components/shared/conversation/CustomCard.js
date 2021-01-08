import React from 'react';
import classnames from 'classnames';
import '../CustomCard.scss'

function CustomCard({ icon, title, body, bodyCss, iconBg, children }) {
  const bodyClasses = classnames("body", {bodyCss})

  return (
    <div className='quote-item-card d-flex align-items-center bg-white rounded'>
      <div className={'mr-3 ' + iconBg}>{icon}</div>
      <div className='d-flex flex-column flex-grow-1'>
        <div className='title'>{title}</div>
        <div className={bodyClasses}>{body}</div>
      </div>
      { children }
    </div>
  )
}

export default CustomCard
