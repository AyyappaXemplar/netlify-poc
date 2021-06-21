import React, { useState, useEffect }             from "react";
import { useSelector, useDispatch }    from 'react-redux'
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
import PaymentSelectionCard from "./payments/PaymentSelectionCard";
import PaymentsForm         from "./payments/PaymentForm"
import AddressForm          from "./payments/Address";
import TitleRow      from "../shared/TitleRow";
import BadgeText     from "../shared/BadgeText";
import FormContainer from "../shared/FormContainer";
import FormAlert     from "../shared/FormAlert"
import SubmitButton  from "../shared/SubmitButton"
import SpinnerScreen                    from "../shared/SpinnerScreen"
import { withTranslation } from 'react-i18next';
import { bindQuote } from '../../actions/quotes'
import { rateFinalQuote }   from '../../actions/rates'
import { findPolicyHolder } from '../../services/quotes'
import validatePayments from '../../validators/bind-online/PaymentsForm'
import PayinFullModal from '../../components/bind-online/payments/PayInFullModal'
import { Helmet } from 'react-helmet'
import mixpanel from "../../config/mixpanel"

const initialCreditcard = {
  number: '',
  cvv: '',
  exp_month:"",
  exp_year:""
}

const initialBankTransfer = {
  routing_number: '',
  account_number: '',
  confirm_account_number: '',
}

const initialBillingAddress = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip_code: ''
}

function useGetRate(quoteId) {
  const dispatch  = useDispatch()
  const { rates } = useSelector(state => state.data)
  const [rate, setRate] = useState(undefined)

  useEffect(() => {
    if (!rates.length) {
      dispatch(rateFinalQuote(quoteId))
    } else {
      setRate(rates[0])
    }

    mixpanel.identify()
  }, [rates, dispatch, quoteId])
  return rate
}

const Payments = ({ history, t }) => {
  const { quote }                                   = useSelector(state => state.data)
  const { bindingQuote }                            = useSelector(state => state.state)
  const rate                                        = useGetRate(quote.id)
  const [paymentMethod, setPaymentMethod]           = useState("credit_card");
  const [creditCard, setCreditCard]                 = useState(()=> quote.credit_card   || initialCreditcard)
  const [bankAccount, setBankAccount]               = useState(()=> quote.bank_transfer || initialBankTransfer)
  const [billingAddressFrom, setBillingAddressFrom] = useState('quote');
  const [billingInfo, setBillingInfo]               = useState({ first_name: '', last_name: ''})
  const [billingAddress, setBillingAddress]         = useState(()=> initialBillingAddress)
  const [errors, setErrors]                         = useState([])
  const [submitted, setSubmitted]                   = useState(false)

  const currentBilingAddress                        = quote.drivers.find(driver => driver.policyholder).address
  const formProps                                   = { paymentMethod, setPaymentMethod, creditCard, setCreditCard, bankAccount, setBankAccount }
  const addressProps                                = { billingInfo, setBillingInfo, billingAddress, setBillingAddress,
                                                        billingAddressFrom, setBillingAddressFrom, currentBilingAddress }
  const dispatch                                    = useDispatch()
  const [paymentOption, setPaymentOption]           = useState([])
  const paymentOptionProps                          = { paymentOption, setPaymentOption }
  const [paymentOptions, setPaymentOptions]         = useState([])
  const [showPayInfullModal, setShowPayInfullModal] = useState(false)

  useEffect(() => mixpanel.track("Pageview", {
    "Page Title": "Payment Plan Selection",
    "Section": "Bind Online"
  }), [])

  useEffect(() => {
    if (rate) {
      if (rate.payment_options[0].plan_type === 'pay_in_full') {
        setPaymentOptions(rate.payment_options.reverse())
      }
      else {
        setPaymentOptions(rate.payment_options)
      }
    }
  }, [rate, paymentOptions]);

  const getInfoFromQuote = () => {
    const policyHolder = findPolicyHolder(quote)
    const { first_name, last_name } = policyHolder
    return { first_name, last_name }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const payment_plan_code = paymentOption.plan_code
    let selectedPaymentMethod = paymentMethod === "credit_card" ?  { credit_card: creditCard } :
                                                            { bank_transfer: bankAccount }
    const address = billingAddressFrom === 'new' ? billingAddress : quote.address
    const info    = billingAddressFrom === 'new' ? billingInfo : getInfoFromQuote()
    const billingParams = { ...selectedPaymentMethod, ...info, address }

    const validationErrors = validatePayments(billingParams, { paymentMethod })

    if (validationErrors) {
      setErrors(err => Object.values(validationErrors).flat())
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      dispatch(bindQuote({ ...quote, payment_plan_code }, billingParams))
    }
  }

  useEffect(() => {
    if (!submitted && bindingQuote) { // flag submission
      setErrors([])
      setSubmitted(true)
    } else if (!bindingQuote & submitted && quote.errors) { // display errors after submission has finished
      setErrors([...errors, quote.errors])
      setSubmitted(false)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (submitted && !bindingQuote) { // submitted without errors
      history.push('/bol/signatures')
    }
  }, [bindingQuote, submitted, history, quote.errors, errors])

  const cancelAndReturn = (e) => {
    e.preventDefault()
    history.push(`/bol/quotes/${quote.id}/rates`)
  }

  if (!rate) {
    return <SpinnerScreen title="Setting up your payment" />
  } else
    return (
    <Container className="pt-base">
      <Helmet>
        <title>Policy payment | InsureOnline.com</title>
      </Helmet>
      <Form onSubmit={handleSubmit}>
            { !!errors.length && errors.map((err, index) =>
                 <Row className='justify-content-center mb-5' key={`error-${index}`}><Col lg={6} ><FormAlert  text={err}/></Col>  </Row>
            )}
        <TitleRow
          title={t("payments.title")}
          subtitle={t("payments.subtitle")}
        />
        <div className="mb-5">
          { paymentOptions.map((option, index) =>
            <PaymentSelectionCard {...paymentOptionProps}
              option={option} key={option.plan_code} index={index} rate={rate} showPayInfullModal={showPayInfullModal} setShowPayInfullModal={setShowPayInfullModal}/>
          )}
        </div>

        <FormContainer bootstrapProperties={{lg: 6}}>
          <PaymentsForm {...formProps}/>
          <AddressForm {...addressProps}/>
        </FormContainer>

        <Row className="justify-content-center">
          <Col lg={5}>
            <SubmitButton text={t("payments.saveAndContinue")} disabled={paymentOption.plan_type === "pay_in_full"} showSpinner={submitted}/>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={5} className="d-flex justify-content-center mb-5">
            <Button onClick={cancelAndReturn} variant="link" type="submit" className="text-med-dark text-decoration-none">{t("payments.cancelAndReturn")}</Button>
          </Col>
          <BadgeText />
        </Row>
        </Form>

        {paymentOption.plan_type === "pay_in_full" && <PayinFullModal showPayInfullModal={showPayInfullModal} setShowPayInfullModal={setShowPayInfullModal} quoteNumber={quote.quote_number}/>}
    </Container>
  );
};

export default withTranslation(['rates'])(Payments);
