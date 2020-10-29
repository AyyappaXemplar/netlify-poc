import React from 'react'
import { ReactComponent as StarIcon } from '../../images/star.svg'

export default function Carrier({ carrier }) {
  return (
    <div className="border p-4 mb-5">
      <div className="d-flex mb-3">
        <div style={{maxWidth: '200px'}}>
          <img style={{width: '100%'}} src={`https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/carriers/logos/${carrier.tag.toLowerCase()}.png`} alt="carrier"/>
        </div>
        <h4 className="px-4">{carrier.name}</h4>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <div className="text-warning d-inline-block mr-2 mb-1">
          {[1,2,3,4,5].map(number => <StarIcon key={number}/>)}
        </div>
        <span>9.5/10</span>
      </div>
      <p className="text-med-dark">
        {carrier.description}
      </p>
    </div>
  )
}

