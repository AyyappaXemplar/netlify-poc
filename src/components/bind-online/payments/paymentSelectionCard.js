import React from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap';

import icon from '../../../images/icon_payment_1.svg'

const PaymentSelectionCard = () => {
    
    const mockData = [
        {
            text: "Pay in Full",
            savingsText: "save $118",
            subText: "$784 due today",
            total:"$784/Total"
            
        },
        {
            text: "$187.92 Due Today",
            savingsText: null,
            subText: "11 payments in total",
            subText2:"10 installments of $150 (includes fees)",
            total:"$834/total"
            
        },
        {
            text: "$196.21 Due Today",
            savingsText: "save $118",
            subText: "12 payments in total",
            subText2:"11 installments of $130 (includes fees)",
            total:"$784/Total"
            
        }
    ]
    
    return (

        mockData.map((payment, i) => { 
            return<Container key={i+1}>
            <Row className="justify-content-center mb-3">
            <Col sm={12} md={6} className={`bg-white shadow-sm rounded p-4`} >
                <Row>
                    <Col md={2} className="d-flex justify-content-center align-items-center"><div className="rounded-circle bg-light p-3 align-items-center"><Image src={icon} /></div></Col>
                    <Col md={6}>
                            <strong className="mr-1">{payment.text}</strong>&nbsp;<small>{payment.savingsText}</small><br />
                            <small>{payment.subText}</small><br/> <small>{payment.subText2}</small>
                    </Col>
                        <Col md={3} className="d-flex justify-content-center align-items-center"><strong>{payment.total}</strong></Col>
                </Row>
            </Col>
        </Row></Container>
        })
    )
}

export default PaymentSelectionCard
