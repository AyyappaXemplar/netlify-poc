import React from 'react';

function PhoneNumberLink({ number, classes }) {
  const phoneNumberHref = "tel:" + number.replace(/\D/g,'');

  return (
    <a href={phoneNumberHref} className={classes}>{number}</a>
  );
}

export default PhoneNumberLink;
