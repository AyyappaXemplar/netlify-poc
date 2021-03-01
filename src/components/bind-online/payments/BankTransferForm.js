import React from "react";
import { Form, Row, Col } from "react-bootstrap";

import payment from 'payment';
// import Radio              from "../../forms/Radio";
// import CustomSelect       from "../../forms/CustomSelect";
export const BankTransferForm = ({ bankAccount, setBankAccount }) => {
  // const statesdata = [
  //   { label: "IL", value: "il", index: 0 },
  //   { label: "MI", value: "mi", index: 1 },
  //   { label: "IN", value: "in", index: 2 },
  // ];

  function formatInput(name, value, element) { 
    
    switch (name) {
      case "routing_number":
        payment.restrictNumeric(element);
        break;
    
      default:
        break;
    }
  }


  function changeBankAccount(event) {
    const { value, name } = event.target;
     formatInput(name, value, event.target)
    setBankAccount(prev => ({...prev, [name]: value }))
  }

//   function changeState(values) {
//     if (!values[0]) return
//     setBankAccount(prev => ({...prev, state: values[0].value }))
//   }
//
//   function changeAccountType(value) {
//     setBankAccount(prev => ({...prev, account_type: value }))
//   }

  return (
    <div className="mb-4 paymentsForm">
      {/* <Form.Group> */}
      {/*   <Form.Label>Payment Name</Form.Label> */}
      {/*   <Form.Control type="text" placeholder="Name" name="name" */}
      {/*      value={bankAccount.name} onChange={changeBankAccount}/> */}
      {/* </Form.Group> */}
      {/* <Form.Group> */}
        {/* <Form.Label>Address</Form.Label> */}
        {/* <Row className="mb-3"> */}
        {/*   <Col lg={9}> */}
        {/*     <Form.Control type="text" placeholder="Address" name="address" */}
        {/*       value={bankAccount.address} onChange={changeBankAccount}/> */}
        {/*   </Col> */}
        {/*   <Col lg={3}> */}
        {/*     <Form.Control type="text" placeholder="Apt" name="apt" */}
        {/*       value={bankAccount.apt} onChange={changeBankAccount}/> */}
        {/*   </Col> */}
        {/* </Row> */}
        {/* <Row> */}
        {/*   <Col lg={5}> */}
        {/*     <Form.Control type="text" placeholder="City" name="city" */}
        {/*       value={bankAccount.city} onChange={changeBankAccount}/> */}
        {/*   </Col> */}
        {/*   <Col lg={2} className="p-0"> */}
        {/*     <CustomSelect options={statesdata} name='state' placeholder="State" */}
        {/*       onChange={changeState}/> */}
        {/*   </Col> */}
        {/*   <Col lg={5}> */}
        {/*     <Form.Control type="text" placeholder="Zip Code" name="zip" */}
        {/*       value={bankAccount.zip} onChange={changeBankAccount}/> */}
        {/*   </Col> */}
        {/* </Row> */}
      {/* </Form.Group> */}

      <Row>
        <Col lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Routing Number</Form.Label>
            <Form.Control type="text" placeholder="22227654"
              name="routing_number" value={bankAccount.routing_number} onChange={(e)=>{changeBankAccount(e)}}/>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Account Number</Form.Label>
            <Form.Control type="text" placeholder="22227654"
              name="account_number" value={bankAccount.account_number} onChange={(e)=>{changeBankAccount(e)}} />
          </Form.Group>
        </Col>

        <Col lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Account Number</Form.Label>
            <Form.Control type="text" placeholder="22227654" name="confirm_account_number"
              value={bankAccount.confirm_account_number} onChange={(e)=>{changeBankAccount(e)}} />
          </Form.Group>
        </Col>
      </Row>

      {/* <Form.Group className="mb-3"> */}
      {/*   <Form.Label>Bank Name</Form.Label> */}
      {/*   <Form.Control type="text" name="bank_name" placeholder="Bank of America" */}
      {/*     value={bankAccount.bank_name} onChange={changeBankAccount}/> */}
      {/* </Form.Group> */}
      {/* <Form.Group> */}
      {/*   <Form.Label>Type of Account</Form.Label> */}
      {/*   <Row> */}
      {/*     <Col> */}
      {/*       <Radio type="radio" label="Checking" value="checking" */}
      {/*         selected={bankAccount.account_type ==='checking'} */}
      {/*         onChange={() =>changeAccountType('checking')}/> */}
      {/*       <Radio type="radio" label="Savings" value="savings" */}
      {/*         selected={bankAccount.account_type ==='savings'} */}
      {/*         onChange={() =>changeAccountType('savings')}/> */}
      {/*     </Col> */}
      {/*   </Row> */}
      {/* </Form.Group> */}
    </div>
  );
};
