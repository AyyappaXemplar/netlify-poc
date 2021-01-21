import React from 'react';
import quoteData from '../../server/quoteReview';
import ReactJson from 'react-json-view'

export default function BolReview(props) {
    return (
        <div className="container">
            <div className="row">
                <h1>Quote Data</h1>

            </div>
            <hr />
            <div className="row">
                <ReactJson src={quoteData} />
            </div>
        </div>
    )
}
