import React            from 'react';
import { useSelector }  from 'react-redux'
import { Container }    from 'react-bootstrap';
import TitleRow         from '../shared/TitleRow';
import PaymentDetails   from './Confirmation/PaymentDetails';
import PolicyDetails    from './Confirmation/PolicyDetails';


const Confirmation = () => {
  
const carriers = useSelector(redux => redux.data.carriers)
  console.log(carriers)
  return (
    <Container >
      <TitleRow title={"Your all set !"} subtitle={"Check your email for policy details and account information."} />
      <PaymentDetails />
      <PolicyDetails />
    </Container>
  )
}

export default Confirmation
