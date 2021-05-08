import React      from 'react'
import ReactStars from "react-rating-stars-component";
import bbbLogo from '../../images/bbb-logo.png'

export default function Carrier({ carrier }) {
  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  const UNITED_SECURITY_HEALTH_AND_CASUALTY = "United Security Health and Casualty"
  const bbbBusinesLink = carrier.name === UNITED_SECURITY_HEALTH_AND_CASUALTY ? "https://www.bbb.org/us/il/bedford-park/profile/insurance-companies/united-security-health-and-casualty-insurance-company-0654-88349633/#sealclick" : "https://www.bbb.org/us/il/bedford-park/profile/insurance-companies/first-chicago-insurance-co-0654-3492/#sealclick"

  return (
    <>
      <div className="d-flex mb-3 flex-column flex-md-row align-items-center">
        <div style={{maxWidth: '200px'}}>
          <img style={{width: '100%'}} src={`https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/carriers/logos/${carrier.tag.toLowerCase()}.png`} alt="carrier"/>
        </div>
          <h4 className="px-md-5 pt-4">{carrier.name}</h4>
      </div>

      <div className="mb-3 d-sm-flex align-items-center">
        <div className="d-flex align-items-center mr-3">
          <ReactStars count={5} value={4.5} size={24} color2={'#ffd700'} edit={false} half={true}/>
          <span className="ml-2">9.5/10</span>
        </div>
        <a className="d-flex" href={bbbBusinesLink} target="_blank" rel="noopener noreferrer nofollow"><img src={bbbLogo} style={{ border: "0", width: "150px", height: "30px" }} alt="First Chicago Insurance Co. BBB Business Review" /></a>
      </div>
      <p className="text-med-dark">
        {carrier.description}
        <br />
        Customer Service: &nbsp;<a href={`tel:${carrier.phone}`} className="text-dark"><u className="text-primary">{formatPhoneNumber(carrier.phone)}</u></a>
      </p>
    </>
  )
}

