import React           from 'react';
import { useSelector } from 'react-redux'
import ReactJson       from 'react-json-view'

// Comment

export default function BolReview(props) {
  const rates = useSelector(state => state.data.rates)
  return (
    <div className="container">
      <div className="row">
        <h1>Quote Data</h1>
      </div>

      <hr />
      <div className="row">
        <ReactJson src={rates} />
      </div>
    </div>
  )
}
