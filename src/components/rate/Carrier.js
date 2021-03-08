import React      from 'react'
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux'

  const {updatingQuoteInfo, fetchingQuoteDocumets} = useSelector(redux => redux.state.updatingQuoteInfo);
export default function Carrier({ carrier, documents, term }) {
  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  const renderCarrierPhoneNumber = () => { 
    return <>Customer Service: &nbsp;<a href={`tel:${carrier.phone}` } className="text-dark"><u className="orange">{formatPhoneNumber(carrier.phone)}</u></a></>
  }
  return (
    <>
      <div className="d-flex mb-3 flex-column flex-md-row">
        <div style={{maxWidth: '200px'}}>
          <img style={{width: '100%'}} src={`https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/carriers/logos/${carrier.tag.toLowerCase()}.png`} alt="carrier"/>
        </div>
        <h4 className="p-0 pt-3 pt-md-0 px-md-4">{carrier.name}</h4>
      </div>

      <div className="mb-3 d-flex align-items-center">
        <ReactStars count={5} value={4.5} size={24} color2={'#ffd700'} edit={false} half={true}/>
        <span>9.5/10</span>
      </div>
      <p className="text-med-dark">
        {carrier.description}
      </p>
      {!updatingQuoteInfo && !fetchingQuoteDocumets && renderCarrierPhoneNumber()}
    </div>
  )
}

