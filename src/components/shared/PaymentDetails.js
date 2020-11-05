import React                       from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { formatMoney }             from '../../services/payment-options';

function PaymentDetails({ option }) {
  // const paymentDetails = paymentDetailsDisplay(option)

  if (option.plan_type === 'pay_in_full') {
    return <span className="d-block price-fees">That's all you'll pay!</span>
  }

  let amount = Math.ceil((option.installment_info.amount + option.installment_info.fee) / 100);
  let deposit = formatMoney(option.deposit / 100);

// option.number_of_payments
  // $85 deposit (deposit amount)

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className="bg-primary text-white">Your Payment Breakdown</Popover.Title>
      <Popover.Content>
        <ul className='pl-3'>
          <li>${deposit} deposit (deposit amount)</li>
          <li>{option.number_of_payments} payments of ${amount} (includes a ${option.installment_info.fee} fee)</li>
        </ul>
      </Popover.Content>
    </Popover>
  );

  return (
    <span className="d-block price-fees">
      <OverlayTrigger trigger={['click', 'hover', 'focus']} placement="right" overlay={popover}>
        <span>View payment breakdown</span>
      </OverlayTrigger>
    </span>
  );
}

export default PaymentDetails;
