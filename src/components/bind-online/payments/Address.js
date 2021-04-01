import React             from 'react';
import { Row, Col, Form} from "react-bootstrap";
import CustomSelect from "../../forms/CustomSelect";
import addressDisplay from '../../../services/address-display'

const Address = ({ billingInfo, setBillingInfo, billingAddress, setBillingAddress, billingAddressFrom,
                   setBillingAddressFrom, currentBilingAddress }) => {
  const addressStatesOptions = [
      { label: "IL", value: "il", index: 0 },
      { label: "MI", value: "mi", index: 1 },
      { label: "IN", value: "in", index: 2 },
    ];

  const handeleAddressRadio  = (event) => setBillingAddressFrom(event.target.value);
  const changeBillingInfo = (event) => {
    event.persist()
    setBillingInfo(prev => {
      const { name, value } = event.target
      return {...prev, [name]: value}
    })
  }
  const changeBillingAddress = (event) => {
    event.persist()
    setBillingAddress(prev => {
      const { name, value } = event.target
      return {...prev, [name]: value}
    })
  }
  const changeAddressState = (values) => {
    if (!values[0]) return
    setBillingAddress(prev => ({...prev, state: values[0].value }))
  }
  const findAddressState = () => addressStatesOptions.find(option => option.value === billingAddress.state) || []
  const displayedAddress = addressDisplay(currentBilingAddress)

    return (
      <>
           <hr className="mb-4"/>
        <Row className="justify-content-center">
          <Col>
  
            <p>
              <strong>Billing</strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-baseline">
            <input type="radio" name="address" id="address-quote" className="mr-3" value='quote'
              checked={billingAddressFrom === 'quote'} onChange={handeleAddressRadio}
            />
            <label htmlFor="address-quote">
              Address is the same as policy ({displayedAddress})
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input type="radio"name="address"id="address-new"className="mr-3" value='new'
              checked={billingAddressFrom === 'new'} onChange={handeleAddressRadio}
            />
            <label htmlFor="address-new">Enter new billing address</label>
          </Col>
        </Row>

        <section style={{display:`${billingAddressFrom === 'new' ? "block" : "none"}`}}>
          <Row className="mt-3">
            <Col className="pr-2">
              <Form.Group>
                <Form.Control type="name" placeholder="First name"
                  name="first_name" value={billingInfo.first_name} onChange={changeBillingInfo}
                />
              </Form.Group>
            </Col>
            <Col className="pl-2">
              <Form.Group>
                <Form.Control type="name" placeholder="Last name"
                  name="last_name" value={billingInfo.last_name} onChange={changeBillingInfo}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="pr-2">
              <Form.Group>
                <Form.Control type="text" placeholder="Address"
                  name="line1" value={billingAddress.line1} onChange={changeBillingAddress} />
              </Form.Group>
            </Col>
            <Col className="pl-2">
              <Form.Group>
                <Form.Control type="name" placeholder="Apartment, suite, unit, building, floor, etc. - Optional"
                  name="line2" value={billingAddress.line2} onChange={changeBillingAddress}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Row>
              <Col xs={5} className="pr-2">
                <Form.Control type="text" placeholder="City"
                  name="city" value={billingAddress.city} onChange={changeBillingAddress}
                />
              </Col>
              <Col xs={3} className="px-2">
                <CustomSelect name="state" className="small" options={addressStatesOptions}
                  placeholder="State" onChange={changeAddressState} values={findAddressState()}
                />
              </Col>
              <Col xs={4} className="pl-2">
                <Form.Control type="text" placeholder="Zip"
                  name="zip_code" value={billingAddress.zip_code} onChange={changeBillingAddress}
                />
              </Col>
            </Row>
          </Form.Group>
        </section>
      </>
    )
}

export default Address
