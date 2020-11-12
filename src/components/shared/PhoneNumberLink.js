import React from 'react';

function PhoneNumberLink({ number, classes, children }) {
  const phoneNumberHref = "tel:" + number.replace(/\D/g,'');

  return (
    <a href={phoneNumberHref} className={classes}>{children || number}</a>
  );
}

export default PhoneNumberLink;
