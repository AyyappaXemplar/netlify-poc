import React from 'react'
import { Link }   from 'react-router-dom'

import { ReactComponent as PhoneIcon } from '../../images/phone-icon.svg';
import { ReactComponent as EmailIcon } from '../../images/email-icon.svg';

import PhoneNumberLink from '../shared/PhoneNumberLink';


function ContactCard({ t }) {
  const quoteId = localStorage.getItem('siriusQuoteId')

  return (
    <div className="shadow p-5 mb-5 bg-white rounded">
      <h2 className="h1-lg mb-2">
        {t('quotes:contact.title')}
      </h2>
      <p>{t('quotes:contact.description')}</p>

      <div className="my-4">
        <h5 className="mb-3">{t('quotes:contact.subtitle')}</h5>

        <div className="text-dark mb-3">
          <PhoneIcon className="mr-3" />
          <PhoneNumberLink number={t('common:header.phoneNumber')} classes="text-dark" />
        </div>

        <div className="text-dark">
          <EmailIcon className="mr-3" />
          <a href={"mailto:" + t('common:header.emailAddress')} className="text-dark">
            {t('common:header.emailAddress')}
          </a>
        </div>
      </div>

      { quoteId &&
        <p>Everything you've added has been saved, you can <Link to="/quotes/review">review your quote</Link> at any time.</p>
      }
    </div>
  )
}

export default ContactCard
