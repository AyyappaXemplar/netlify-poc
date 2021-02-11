import React                               from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { getAmount, getDeposit, getInstallmentFee } from '../../services/rate-payment-details';

function PaymentDetails({ option }) {
  if (option.plan_type === 'pay_in_full') {
    return <span className="d-block price-fees text-medium-dark">That's all you'll pay!</span>
  }

  let amount = getAmount(option)
  let deposit = getDeposit(option)
  let installment_fee = getInstallmentFee(option)

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Your Payment Breakdown</Popover.Title>
      <Popover.Content>
        <ul className='pl-3'>
          <li>${deposit} deposit (deposit amount)</li>
          <li>{option.number_of_payments} payments of ${amount} (includes a ${installment_fee} fee)</li>
        </ul>
      </Popover.Content>
    </Popover>
  );

  return (
    <span className="d-block price-fees leading-none">
      <OverlayTrigger trigger={['click']} placement="right" overlay={popover} rootClose={true}>
        <Button variant="link" className="text-medium-dark p-0 border-0 text-decoration-none">View payment breakdown</Button>
      </OverlayTrigger>
    </span>
  );
}

export default PaymentDetails;
