import React                from 'react'
import { Image }            from "react-bootstrap";
import ReactStars           from "react-rating-stars-component";
import bbbLogo              from '../../images/bbb-logo.png'
import { withTranslation }  from 'react-i18next';


export default  withTranslation(['common'])(function Carrier({ carrier, t }) {
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
      <div className="mb-3">
        <div className="row d-flex px-1">

          <div className="col-md-5">

            <Image className="image-scale" src={`https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/carriers/logos/${carrier.tag.toLowerCase()}.png`} alt="carrier" />

            <h4 className="text-center text-md-left my-3 pt-3 d-block d-md-none">{carrier.name}</h4>

            <div className="d-flex row align-items-center my-sm-3 justify-content-center">
                <span className="d-flex row align-items-center col-xs-6 col-12 justify-content-center">
                  <ReactStars count={5} value={4.5} size={24} color2={'#ffd700'} edit={false} half={true} />
                <span className="ml-2">9.5/10</span>
              </span>
            </div>
          </div>

          <div className="col-md-7 pl-md-3 ">
            <h4 className="text-center text-md-left my-3 d-none d-md-block">{carrier.name}</h4>
           
          </div>
        </div>
      </div>
      <p className="text-med-dark mb-0">
        {carrier.description}

        <br />
        Customer Service: &nbsp;<a href={`tel:${carrier.phone}`} className="text-dark"><u className="text-primary">{formatPhoneNumber(carrier.phone)}</u></a>
        <a className="d-flex mt-3" href={t(`carrierLinks.${carrier.tag}.link`)} target="_blank" rel="noopener noreferrer nofollow"><img width="200" height="45" src={bbbLogo} className="b-none" alt={t(`carrierLinks.${carrier.tag}.altText`)} /></a>
      </p>
    </>
  )
})

