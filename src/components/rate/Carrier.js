import React      from 'react'
import ReactStars from "react-rating-stars-component";
import bbbLogo from '../../images/bbb-logo.png'
import CARRIER_LINKS from '../../constants/carrier-links'

export default function Carrier({ carrier }) {
  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  return (
    <>
      <div className="d-flex mb-3 flex-column flex-column flex-lg-row align-items-center">
        <div className="pt-4 mr-4" >
          <img style={{width: '100%'}} src={`https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/carriers/logos/${carrier.tag.toLowerCase()}.png`} alt="carrier"/>
          <div style={{ minWidth: "160px" }} className="d-none d-lg-flex align-items-center mr-3 pt-4">
            <ReactStars count={5} value={4.5} size={24} color2={'#ffd700'} edit={false} half={true}/>
            <span className="ml-2">9.5/10</span>
          </div>
        </div>
          <div className="flex-column d-lg-flex">
            <h4 className="pt-4 text-center text-md-left">{carrier.name}</h4>
            <a className="d-none d-lg-flex pt-4" href={CARRIER_LINKS[carrier.tag]} target="_blank" rel="noopener noreferrer nofollow"><img width="150" height="30" src={bbbLogo} className="b-none" alt="First Chicago Insurance Co. BBB Business Review" /></a>
          </div>
      </div>

      <div className="mb-3 d-flex flex-column flex-sm-row justify-content-center">
        <div style={{ minWidth: "160px" }} className="d-flex d-lg-none align-items-center flex-row">
          <ReactStars count={5} value={4.5} size={24} color2={'#ffd700'} edit={false} half={true}/>
          <span className="ml-2">9.5/10</span>
        </div>
        <a className="d-md-flex d-lg-none" href={CARRIER_LINKS[carrier.tag]} target="_blank" rel="noopener noreferrer nofollow"><img width="150" height="30" src={bbbLogo} className="b-none" alt="First Chicago Insurance Co. BBB Business Review" /></a>
      </div>
      <p className="text-med-dark">
        {carrier.description}
        <br />
        Customer Service: &nbsp;<a href={`tel:${carrier.phone}`} className="text-dark"><u className="text-primary">{formatPhoneNumber(carrier.phone)}</u></a>
      </p>
    </>
  )
}

