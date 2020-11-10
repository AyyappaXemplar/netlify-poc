import React                               from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { formatMoney }                     from '../../services/payment-options';

function PaymentDetails({ option }) {
  if (option.plan_type === 'pay_in_full') {
    return <span className="d-block price-fees">That's all you'll pay!</span>
  }

  let amount = Math.ceil((option.installment_info.amount + option.installment_info.fee) / 100);
  let deposit = formatMoney(Math.ceil(option.deposit / 100));
  let installment_fee = formatMoney(Math.ceil(option.installment_info.fee / 100));

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
    <span className="d-block price-fees">
      <OverlayTrigger trigger={['click']} placement="right" overlay={popover} rootClose="true">
        <Button variant="link" className="text-medium-dark p-0">View payment breakdown</Button>
      </OverlayTrigger>
    </span>
  );
}

export default PaymentDetails;
